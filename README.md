# JOY NEXUS 2K26 — symposium website

School of Engineering and Technology, Joy University · 1 September 2026

## Files

```
index.html          Home page — hero video, events, prizes, schedule, contacts
register.html       Registration — details → events → ₹250 payment → transaction number
apps-script.gs      Code for the Google Sheet that collects registrations
```

There is no assets folder. The campus photo, the logo and the UPI QR are all built into the HTML files, so each page works on its own — opened from a pen drive, emailed to someone, or served from GitHub. `apps-script.gs` is not part of the website; it lives in your Google Sheet.

---

## Deploy on GitHub Pages

**1. Create the repository**

Go to github.com → **New repository**. Name it `joynexus2k26`. Set it **Public** (Pages needs public on the free plan). Do not add a README — you already have one.

**2. Upload the files**

On the empty repo page, click **uploading an existing file**. Drag in `index.html`, `register.html`, `README.md` and `apps-script.gs`.

Scroll down, type `first upload` in the commit box, click **Commit changes**.

**3. Turn on Pages**

**Settings** → **Pages** (left sidebar) → under *Build and deployment*, set Source to **Deploy from a branch**, Branch to **main**, folder to **/ (root)** → **Save**.

**4. Wait, then open**

Refresh the Pages screen after a minute. It shows:

```
https://<your-username>.github.io/joynexus2k26/
```

That's the live site. The registration page sits at `.../joynexus2k26/register.html`.

**5. To change anything later**

Open the file on GitHub → pencil icon → edit → **Commit changes**. The live site updates in about a minute. Hard-refresh (Ctrl+Shift+R) if you still see the old version.

### Custom domain (optional)

If IT can add a CNAME record for something like `joynexus.joyuniversity.edu.in` pointing to `<your-username>.github.io`, enter that domain under **Settings → Pages → Custom domain**.

---

## Registrations go into a Google Sheet

Set this up once, before you publish. It takes about five minutes.

**1. Create the sheet**

Open [sheets.new](https://sheets.new). Name it `JOY NEXUS 2K26 Registrations`.

**2. Add the script**

**Extensions** → **Apps Script**. Delete whatever is in the editor, paste the entire contents of `apps-script.gs`, and press the save icon.

**3. Publish it**

**Deploy** → **New deployment** → gear icon → **Web app**.

- Description: `registration receiver`
- Execute as: **Me**
- Who has access: **Anyone** ← must be Anyone, or the website cannot post to it

Click **Deploy**. Google asks you to authorise — choose your account, click **Advanced** → **Go to (project name)** → **Allow**. That warning appears because the script is unpublished and yours; it is expected.

Copy the **Web app URL**. It ends in `/exec`.

**4. Connect the website**

Open `register.html`, find the CONFIG block near the top of the `<script>`, and paste the URL:

```js
sheetURL:   "https://script.google.com/macros/s/AKfy..../exec",
```

**5. Test it**

Open the registration page, submit a fake entry, and check that a row appears in the sheet. Delete the test row afterwards.

### What you get

One row per registration, with columns:

| Timestamp | Reference | Name | College | Department | Year | Phone | Email | Events | Amount | UTR | Lunch | Payment verified |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

The last column starts as `No`. Check each UTR against the Indian Bank statement and change it to `Yes`. Filter on that column to see who still needs chasing.

**To open it in Excel:** File → Download → Microsoft Excel (.xlsx). You can also share the sheet with the registration committee so several people verify at once.

### If the sheet is unreachable

If the URL is wrong or Google is down, the page falls back to a WhatsApp message to **+91 81441 20859** so no registration is lost. Every participant also gets a reference number like `JN26-4K7P` on screen — ask for it at the desk if you cannot find their row.

### One caution

A public web app URL means anyone who finds it could post junk rows. In practice this is rare for a college symposium, and the UTR column protects you — no money moves without a matching bank entry. If you ever see spam rows, redeploy the script to get a fresh URL and update `sheetURL`.

## Settings you may need to change

All in one block near the top of the `<script>` in `register.html`:

```js
const CONFIG = {
  vpa:        "joyuniversity@indianbk",
  payeeName:  "Joy University",
  amount:     "250.00",
  note:       "Symposium Registration",
  sheetURL:   "",               // ← your Apps Script web app URL goes here
  whatsapp:   "918144120859",   // fallback only
  deadline:   "2026-08-30T23:59:59+05:30"
};
```

The **Pay on this phone** button is built from these values. The **QR image is a separate file** — changing `amount` here does *not* change the QR. Ask for a new QR if the fee changes.

After the deadline passes, the page automatically replaces the form with a "Registration has closed" notice.

## Editing events

Event names, times, prizes and rules live in the `EVENTS` array in each file's `<script>`. Edit the text there and both the cards and the pop-ups update. Rules for seven of the eight events are still marked **DRAFT** until the in-charges confirm them.
