/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advancedWalkBtn');
    element.addEventListener('click', function () {
        advancedWalk();
    });

    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('addElementBtn');
    element.addEventListener('click', function () {
        createNewElement();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDelete');
    element.addEventListener('click', function () {
        safeDelete();
    });

    element = document.getElementById('selectDelete');
    element.addEventListener('click', function () {
        selectDelete();
    });

    element = document.getElementById('cloneBtn');
    element.addEventListener('click', function () {
        basicClone();
    });

    element = document.getElementById('advancedCloneBtn');
    element.addEventListener('click', function () {
        advancedClone();
    });
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

function advancedWalk() {
    let textarea = document.getElementById('walk-output');
    textarea.value = "";

    let stack = [{node: document.documentElement, depth: 0}];

    while(stack.length > 0) {
        let {node, depth} = stack.pop();

        if (node.nodeType === 3 || node.nodeType === 8) {
            continue;
        }

        let indentation = '';
        if (depth > 0) {
            indentation = '|   '.repeat(depth - 1) + '|-- ';
        }

        textarea.value += `${indentation}${node.nodeName}\n`;

        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push({node: node.children[i], depth: depth + 1});
        }
    }
}

function advancedModify() {
    let h1 = document.querySelector('h1');
    h1.textContent = "DOM Manipulation is Fun!";
    
    let darkColors = ['--darkcolor1', '--darkcolor2', '--darkcolor3', '--darkcolor4', '--darkcolor5', '--darkcolor6'];
    let randomColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    
    h1.style.color = `var(${randomColor})`;
  
    let p = document.querySelector('#p1');
    
    if (p.classList.contains('shmancy')) {
      p.classList.remove('shmancy');
    } else {
      p.classList.add('shmancy');
    }
  }

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    let textarea = document.getElementById('walk-output');
    textarea.value += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n`;

}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function createNewElement() {
    let selectedType = document.getElementById('elementType').value;
    let content = document.getElementById('contentInput').value || `New ${selectedType}`;

    let newElement;
    switch (selectedType) {
        case 'TextNode':
            newElement = document.createTextNode(content + " - " + new Date().toLocaleString());
            break;
        case 'Comment':
            newElement = document.createComment(content + " - " + new Date().toLocaleString());
            break;
        case 'Element':
            newElement = document.createElement(content);
            newElement.textContent = `New ${content} - ${new Date().toLocaleString()}`;
            newElement.className = 'new-content';
            break;
    }
    let output = document.getElementById('addNewElement');
    if(selectedType != "Comment") {
        br = document.createElement('br')
        output.appendChild(br);
    }
    output.appendChild(newElement);
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safeDelete() {
    let elements = document.body.getElementsByTagName('*');
    for (let i = elements.length - 1; i >= 0; i--) {
        if (!document.getElementById('controls').contains(elements[i])) {
            elements[i].remove();
        }
    }
}

function selectDelete() {
    let selectorInput = document.getElementById('selector').value;
    let elements = document.querySelectorAll(selectorInput);
    elements.forEach(function(element) {
        element.remove();
    });
}

function basicClone() {
    let originalP = document.querySelector('p');
    let clonedP = originalP.cloneNode(true);
    clonedP.removeAttribute('id');
    let outputElement = document.getElementById('clonedElements');
    outputElement.appendChild(clonedP);
}

function advancedClone() {
    let template = document.querySelector("#cardTemplate");
    let clone = template.content.cloneNode(true);
    
    let imgSrc = "https://source.unsplash.com/random/200x200"; 
    let randomNum = Math.floor(Math.random() * 1000);

    clone.querySelector(".card-img").src = imgSrc;
    clone.querySelector(".card-title").textContent = "Card Title " + randomNum;
    clone.querySelector(".card-text").textContent = "This is card number " + randomNum;
    
    document.body.appendChild(clone);
}
window.addEventListener('DOMContentLoaded', init);