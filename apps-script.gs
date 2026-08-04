/**
 * JOY NEXUS 2K26 — registration receiver
 *
 * Paste this into Extensions → Apps Script inside your Google Sheet,
 * then Deploy → New deployment → Web app.
 * Full instructions are in README.md.
 */

var SHEET_NAME = 'Registrations';

var HEADERS = [
  'Timestamp', 'Reference', 'Name', 'College', 'Department', 'Year',
  'Phone', 'Email', 'Events', 'Amount', 'UTR', 'Lunch', 'Payment verified'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);                     // stops two people writing the same row

  try {
    var sheet = getSheet_();
    var d = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      d.ref     || '',
      d.name    || '',
      d.college || '',
      d.dept    || '',
      d.year    || '',
      "'" + (d.phone || ''),   // leading ' keeps Sheets from mangling the number
      d.email   || '',
      d.events  || '',
      d.amount  || '250.00',
      "'" + (d.utr || ''),     // same for the 12-digit UTR
      d.lunch   || '',
      'No'                     // your team changes this to Yes after checking the bank statement
    ]);

    return json_({ ok: true, ref: d.ref });

  } catch (err) {
    return json_({ ok: false, error: String(err) });

  } finally {
    lock.releaseLock();
  }
}

/** Opening the web app URL in a browser shows this — handy for checking it is live. */
function doGet() {
  return ContentService.createTextOutput(
    'JOY NEXUS 2K26 registration endpoint is running. Registrations are POSTed here by the website.'
  );
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
