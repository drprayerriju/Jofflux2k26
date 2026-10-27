# SOET Question Paper Studio

A static, browser-only question paper generator for Joy University, School of Engineering and Technology. No backend, API key, account or build step is needed. All required JavaScript is included locally.

## Publish on GitHub Pages

1. Extract this ZIP on your computer.
2. Create a public GitHub repository, for example `soet-question-paper`.
3. Upload all extracted files and folders to the repository root. `index.html` must be directly in the root, with `vendor` and `assets` alongside it. Upload the extracted contents, not the ZIP itself.
4. In the repository, open Settings → Pages. Select “Deploy from a branch”, the `main` branch, and `/(root)`, then Save.
5. Once deployment finishes, use the “Visit site” link shown by GitHub and circulate that URL to faculty.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

You can also open `index.html` locally in a current desktop browser to use the generator without hosting. Keep all accompanying files in their folders.

## Faculty workflow

- Choose Backlog or Comprehensive, then select the batch and semester. No programme selection is required.
- Backlog lists all subjects in the existing catalogue, regardless of the selected batch. Set the required batch/semester heading yourself and enter the backlog examination date. The uploaded timetable is comprehensive; backlog dates are therefore not copied from it. Courses not present in the supplied catalogue can be entered manually or added to catalog.js.
- Choose the course from one dropdown showing code(s) first, separated by slashes, followed by the course name. Matching course names are grouped with all unique codes: within the selected semester for comprehensive, or across the catalogue for backlog. Review the auto-filled date and session. Optional course corrections are available in an expandable editor.
- Comprehensive: select Set A or Set B. Backlog: no set is requested. Enter the number of copies required for either mode.
- Download a personalised blank Word template, or continue to enter all 13 questions and mappings.
- Save a private JSON draft to resume later. This is a separate download, not a server save. Closing or refreshing the tab discards unsaved entries.
- Download the completed DOCX and review pagination and equation appearance in Word before submitting it through the school's established process.

Downloads follow:
`SOET_SET A_CourseCode_CourseName_DD.MM.YYYY_FN_NumberOfCopies.docx`
Backlog downloads omit the set segment: `SOET_CourseCode_CourseName_DD.MM.YYYY_FN_NumberOfCopies.docx`. Their title is `BACKLOG EXAMINATION`; comprehensive papers retain `COMPREHENSIVE SEMESTER EXAMINATION`.

Multiple course codes use underscores in the filename and slashes in the paper heading. Characters that cannot appear in filenames are replaced with underscores.

## Document format

The latest uploaded “Other schools QP Template” is the source. The university logo, roll-number boxes, section structure and question-table columns are retained. Header text is Georgia 12 pt; text below the divider is Times New Roman 11 pt. Equations are native editable Word equation objects and may use Word's maths font. Fonts must be installed on the computer opening the DOCX to avoid font substitution.

The heading contains only `Semester No. (Year Batch)`, without programme names. Sections A and B retain CO, BL and PO. Section C retains CO and BL only, as in the new template.

- Section A: five questions; answer all; 5 × 2 = 10 marks.
- Section B: six questions; answer any five; 5 × 5 = 25 marks.
- Section C: two questions; answer any one; 1 × 15 = 15 marks.
- Total: 50 marks; 2 hours; 40% weightage.

## Equations

Place a supported LaTeX-style expression between `$` delimiters, for example:

```
State the bending equation $\frac{M}{I}=\frac{\sigma}{y}=\frac{E}{R}$.
Calculate $\delta=\frac{P L^{3}}{3 E I}$.
Use $v=\sqrt{2 g h}$ and $R_{A}+R_{B}=100$.
```

Supported: fractions, square roots, superscripts, subscripts, grouped expressions, Greek letters, arithmetic and comparison symbols, sin/cos/tan/log/ln/exp, and integral and summation symbols. This is a bounded expression parser, not a complete LaTeX renderer. Matrices, cases, indexed roots, accents and LaTeX environments are not supported. Add more complex equations in Word after download. Unsupported commands and unclosed delimiters produce an error rather than a misleading equation.

## Catalogue and future updates

`catalog.js` contains all editable programme, batch and course data. The initial catalogue has 16 programmes and 92 course records from the SOET sheet only. Common courses with multiple codes are represented by one timetable record where the workbook merges cells. Other schools are excluded. SOET's Fashion Design and Transportation and Automobile Design entries are included because they appear in that sheet.

The 2023–2027 batch displays **Semester VI** at the user's request. Its source courses are from the timetable's **Semester VII** block. Other batch mappings are I, III and V. Original course titles, code prefixes and schedule details are retained, including apparent inconsistencies in the draft timetable. Review them before circulation.

To update shared data:

1. Open Course catalogue → Edit catalogue data.
2. Edit the JSON; add/remove/update courses, programmes or batches.
3. Apply changes to validate and use the data in the current tab.
4. Download `catalog.js`.
5. Replace the repository's `catalog.js` with the new file and commit. GitHub Pages will publish the updated version.

Any visitor can experiment with a local catalogue copy; only a person with repository write access can change the shared website. No administrator password is embedded in this static page. Draft papers and entered questions are never written into the public catalogue.

Catalogue schema:
- `batches`: `label`, `batch`, `semester`, `sourceSemester`.
- `programs`: retained timetable metadata; not used for faculty selection.
- `courses`: unique `id`, `sourceSemester`, list of `programs` IDs, list of `codes`, `title`, ISO `date` and `session` (`FN` or `AN`).

## Files and maintenance

- `index.html`, `style.css`: interface and responsive styling.
- `app.js`: selection, validation, catalogue editing, draft files and Word export.
- `equations.js`: equation parser and native Word/MathML output.
- `catalog.js`: editable timetable data.
- `template.js`: encoded DOCX used by the generator, so no network template fetch is required.
- `assets/template.docx`: matching template source with placeholders (not a final submission file).
- `vendor/jszip.min.js`: ZIP/DOCX packaging library; its licence is included.

Changing `assets/template.docx` alone does not update the generator. Regenerate `template.js` as `window.TEMPLATE_BASE64 = "<base64 of the complete DOCX>";` after a template edit. Preserve the placeholder names and keep each placeholder inside a single Word run.

## Verification

The supplied code was checked for JavaScript syntax, DOCX ZIP and XML integrity, blank and completed exports, native equation structures, unsupported-equation rejection, catalogue counts and semester-based course selection. Representative generated Word documents were rendered and visually checked. Microsoft Word itself was not available for interactive testing. The hosting package has not been published to a GitHub account.
