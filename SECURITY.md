# Security policy

## Supported versions

Only the latest version deployed at <https://taka-invoice.netlify.app> and the `main` branch receive security fixes.

## How the app handles your data

Taka Invoice runs entirely in your browser. It has no backend, account system or analytics. The details you type are stored only in your browser's `localStorage` under the key `taka-invoice:v1`, and are never sent to a server. **Clear form** removes them. Anyone with access to the same browser profile can read them, so avoid using the app on shared computers for sensitive data.

## Reporting a vulnerability

Please do not report security problems in public issues.

Report them privately through GitHub's [private vulnerability reporting](https://github.com/montasim/taka-invoice/security/advisories/new) for this repository. Include:

- what the problem is and where it is (file, URL or steps);
- how it could be exploited;
- the browser and operating system you used.

You should receive a reply after the report has been reviewed. Please give a reasonable amount of time for a fix before disclosing the issue publicly.
