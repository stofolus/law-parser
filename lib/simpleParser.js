const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const PATTERNS = {
    PART: /AVD. [A-Z]+ /,
    PARAGRAPH: /[0-9]/,
    CHAPTER: /KAP. /
};

class Scraper {
  static parse(url) {
    return JSDOM.fromURL(url).then(dom => {
        const document = dom.window.document;
        const doc = {};
        const chapters = document.querySelectorAll('h3[name^="K"]');
        for(let i = 0; i < chapters.length; i++) {
          const chapter = chapters[i].getAttribute("name").substr(1);
          doc[chapter] = {
            text: chapters[i].textContent,
            paragraphs: {},
          };
        }
        const paragraphs = document.querySelectorAll('.paragraf');
        for(let i = 0; i < paragraphs.length; i++) {
          if(paragraphs[i].parentElement.tagName === 'LI') continue;
          const chapter = /K[0-9a-z]*/.exec(paragraphs[i].getAttribute("name")).toString().substr(1);
          const paragraph = /P[0-9a-z]*/.exec(paragraphs[i].getAttribute("name")).toString().substr(1);
          let text = paragraphs[i].parentElement.textContent;
          const sibling = paragraphs[i].parentElement.nextElementSibling;
          if(sibling
            && sibling.tagName === 'P'
            && sibling.textContent.length > 0) {
            text = `${text}\n${sibling.textContent};`
          }
          doc[chapter].paragraphs[paragraph] = {
            text
          };
        }
        fs.writeFileSync(`${/[A-ZÅÄÖa-zåäö]*/.exec(document.title)}.json`, JSON.stringify(doc, null, 2), 'utf8');
    });
  }
}

module.exports = Scraper;
