# Website invitation-card for Andranik and Zara wedding

## Goal
We are building a website invitation-card for Andranik and Zaruhi wedding.
The website should be in Armenian. 
It is single page, a couple of sections to scroll back and forth.
It should be mobile first, and responsive - this is important.
It should load fast, and feel fast when used - this is important.

We want as less external dependencies and tooling as possible.
But we can consider adding tooling, libs, if it will make things better, reliable.

## Sections

Each section should fill up the entire viewport when scrolled, or navigated to

### section 1 - hero element with flowers and names for the ones getting married

### section 2 - countdown element
The wedding is at Aug 30, we should show a nice animated countdown (secs, mins, hrd, days remaining)
Let's count down from 12:00 - midday.

### section 3 - invitation text: title and description
"Dear guests, we are pleased to invite you...."

### section 4 - calendar
it is static, showing only month August, with the Aug 30 inside a nice wedding ring

### section 5 - locations
one is for the church, one for the restaurant. Yandex or Google Map integration.

### section 6 - photo booth, album 
we will show a QR code for the guests to scan and upload their photos

### footer
some warm words to the guests and wishes to have a nice time together


## Scrolling, navigation
Scrolling should be smooth, some sections (maybe all) will have controls to lead you to the next section.
Then on the side, perhaps top right we should have a fixed, sticky minimap - set of icons corresponding to all sections
so you can jump between sections.

## Hosting, deployment
We need some tooling for preparing the website for the deployment: minification, concatenation, gzipping
Suggest a free or cheap hosting suitable for this project.

## Implementation
I will provide the assets later, for now let's focus on main structure functionality, colors
