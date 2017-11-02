# law-parser
Downloads and parses Swedish laws from riksdagen.se into JSON

## Install
From NPM
```
npm install law-parser --global
```

## Usage
```
law-parser <url>
```
### Examples
Download one law
```
law-parser https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/socialforsakringsbalk-2010110_sfs-2010-110
```
Download multiple laws
```
law-parser https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/socialforsakringsbalk-2010110_sfs-2010-110 https://www.riksdagen.se/sv/dokument-lagar/dokument/svensk-forfattningssamling/tryckfrihetsforordning-1949105_sfs-1949-105
```
