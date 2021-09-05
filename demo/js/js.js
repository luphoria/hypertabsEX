let history = {};
let sir = true;

// functions
function getUrl(x) {
  console.log(x)
  const urlBarcontents = x || document.getElementById('urlbar').value;
  const urlThing = urlBarcontents.match(/http(s?):\/\/(([a-z0-9]|\-|\_|\.){1,999})/gi);
  if (urlThing === null) throw Error('Invalid URL ' + urlBarcontents);
  const b64Url = btoa(urlBarcontents);
  return b64Url;
}
const getActiveFrameId = () => +document.querySelector(".chrome-tab[active]").getAttribute("ifd") + 1;
function addPageToHistory(id, page) {
  if (!sir) {
    sir = true;
    return;
  }
  if (!(id in history)) {
    history[id] = [[], -1];
  }

  if (history[id][1] < history[id][0].length - 1) {
    history[id][0] = history[id][0].slice(0, history[id][1] + 1);
  }
  if (history[id][0][[history[id].length - 1]] == page)
    return;
  history[id][0].push(page);
  history[id][1] = history[id][0].length - 1;
}
function getPage(id) {
  return ((history[id] || [])[0] || [])[history[id][1]] || '/main.php';
}
function getBack(id) {
  sir = false;
  history[id][1]--;
  return getPage(id);
}
function getForward(id) {
  if (history[id][1] >= history[id][0].length - 1)
    return getPage(id);
  sir = false;
  history[id][1]++;
  return getPage(id);
}
function decodeUrl(x) {
  const y = x.split('/');
  if (y[0].includes('%') == true) {
    return atob(y[0].split('%')[0]);
  } else {
    return atob(y[0]);
  }
}
function getBookmark() {
  let abmk = document.getElementById(getActiveFrameId()).contentDocument.querySelector('link[rel="favicon"], link[rel="shortcut icon"], link[rel="icon"]');
  if (abmk !== null) {
    return abmk.href;
  } else {
    return '/favicon.ico';
  };
};
function setinfo(aa) {
  document.getElementsByClassName(aa)[0].firstChild.data = document.getElementById(aa).contentWindow.document.title;
  if (!document.getElementById(aa).contentWindow.location.href.includes('/fetch/')) {
    addPageToHistory(aa, document.getElementById(aa).contentWindow.location.href);
    return;
  }
  let regUrl = document.getElementById(aa).contentWindow.location.href;
  regUrl = regUrl.split('/fetch/').slice(1).join('/fetch/');
  let b64Url = decodeUrl(regUrl);
  if (getActiveFrameId() === +aa) {
    document.getElementById('urlbar').value = b64Url;
  }
  document.querySelector(`div[ifd="${+aa - 1}"]`).children[2].children[0].attributes[1].value = `background-image: url(${getBookmark()})`
  addPageToHistory(aa, document.getElementById(aa).contentWindow.location.href);
}
function action(a) {
  let value = document.getElementById('urlbar');
  if (value === '') {
    alert('Please insert a URL');
  } else if (!value.value.includes('http')) {
    value.value = "http://" + value.value;
    document.getElementById(getActiveFrameId()).src = value.value;
  } else {
    document.getElementById(getActiveFrameId()).src = value.value;
  }
}
function hideId(...x) {
  x.forEach((a) => {
    document.getElementById(a).style.display = "none";
  });
}
function showId(...x) {
  x.forEach((a) => {
    document.getElementById(a).style.display = "block";
  });
}
function toggleId(...x) {
  x.forEach((a) => {
    if (getComputedStyle(document.getElementById(a)).display === "none") {
      showId(a);
    } else {
      hideId(a);
    }
  });
}
function openMenu(...x) {
  let elems = x.map((id) => document.getElementById(id));
  let shouldOpen = true;
  elems.forEach((elm) => {
    if (getComputedStyle(elm).display !== 'none') {
      shouldOpen = false;
    }
  });
  if (shouldOpen) {
    showId(elems[0].id);
  } else {
    elems.forEach((elm) => hideId(elm.id));
  }
}
function inspect() {
  (function () { var script = document.createElement('script'); script.src = 'js/inspect.js'; script.className = 'webxray'; script.setAttribute('data-lang', 'en-US'); script.setAttribute('data-baseuri', 'https://x-ray-goggles.mouse.org'); document.body.appendChild(script); }())
}
function opencity(a) {
  tc = document.getElementsByClassName('iframething');
  for (ii = 0; ii < tc.length; ii++) {
    tc[ii].style.display = 'none';
  }
  document.getElementById(a).style = 'display:inline';
  document.getElementById(a).focus();
  switch (document.getElementById(a).contentWindow.location.href) {
    case `https://google.com/?igu=1`:
      document.getElementById('urlbar').value='';
      break;
    case '':
      break;
    default:
      let regUrl = document.getElementById(a).contentWindow.location.href;
      regUrl = regUrl.split('/fetch/').slice(1).join('/fetch/');
      let b64Url = decodeUrl(regUrl);
      if (getActiveFrameId() === +a) {
        document.getElementById('urlbar').value = b64Url;
      }
      break;
  }
}
try {
 setTimeout(() => { ([...document.getElementsByTagName`iframe`].reverse().find(a=>!a.src).contentDocument.getElementsByTagName`button`[0]||document.createElement`a`).click(); }, 10000);
    }
catch(err) {};
var el = document.querySelector('.chrome-tabs');
var chromeTabs = new ChromeTabs();
chromeTabs.init(el);
	var i = 2;
document.querySelector('button[data-add-tab]').addEventListener('click', _ => {
  _.preventDefault()
  chromeTabs.addTab({
    title: 'New Hypertab',
    favicon: 'favicon.ico'
  });
  document.getElementById('urlbar').value = '';
  var uwu = i++;
  var frame = document.createElement('IFRAME');
  frame.setAttribute('src', 'https://google.com/?igu=1');
  frame.setAttribute('allow', 'fullscreen');
  frame.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock')
  document.body.appendChild(frame);
  frame.setAttribute('class', 'iframething');
  frame.setAttribute('style', 'display:none');
  frame.setAttribute('id', uwu);
  frame.setAttribute('onload', `setinfo(${uwu})`);
  opencity(uwu);
})
document.querySelector('#urlbar').addEventListener('keyup', event => {
  if (event.key !== 'Enter') return;
  action(document.querySelector("#urlbar").value);
  event.preventDefault();
});
document.getElementById('createTab').click();
document.getElementById('optionsdrop').style.display = 'none';
if (!('tabbkg' in localStorage)) {
  localStorage.setItem('tabbkg', '#202124');
  localStorage.setItem('tabhover', '#292b2e');
  localStorage.setItem('tabact', '#323639');
  localStorage.setItem('tabacttit', '#f1f3f4');
  localStorage.setItem('tabinatit', '#9ca1a7');
  localStorage.setItem('searchbar', '#202124');
  localStorage.setItem('mockb', '#323639');
  localStorage.setItem('nt', '#FFF');
  localStorage.setItem('ua', navigator.userAgent);
}
let items = ['tabbkg', 'tabhover', 'tabact', 'tabacttit', 'tabinatit', 'searchbar', 'ua'];
function applyTheme(a) {
  switch (a) {
    case 'Apply':
      for (ii = 0; ii < items.length; ii++) {
        localStorage.setItem(items[ii], `${document.getElementById(items[ii]).value}`);
      }
      localStorage.setItem('mockb', document.getElementById('tabact').value);
      location.reload();
      break;
    case 'Dark':
    case 'Reset':
      localStorage.setItem('tabbkg', '#202124');
      localStorage.setItem('tabhover', '#202124');
      localStorage.setItem('tabact', '#323639');
      localStorage.setItem('tabacttit', '#9ca1a7');
      localStorage.setItem('tabacttit', '#f1f3f4');
      localStorage.setItem('tabinatit', '#9ca1a7');
      localStorage.setItem('searchbar', '#202124');
      localStorage.setItem('mockb', '#323639');
      localStorage.setItem('nt', '#FFF');
      location.reload();
      break;
    case 'Light':
      localStorage.setItem('tabbkg', '#f4f5f6');
      localStorage.setItem('tabhover', '#f4f5f6');
      localStorage.setItem('tabact', '#fff');
      localStorage.setItem('tabacttit', '#9ca1a7');
      localStorage.setItem('tabacttit', '#45474a');
      localStorage.setItem('tabinatit', '#5f6368');
      localStorage.setItem('searchbar', '#D0D8E8 ');
      localStorage.setItem('mockb', '#fff');
      localStorage.setItem('nt', '#323639');
      location.reload();
      break;
  } 
};
for (ii = 0; ii < items.length; ii++) {
  document.getElementById(items[ii]).value = localStorage.getItem(items[ii]);
};
document.cookie = `alloyua=${localStorage.getItem('ua')}`
document.head.insertAdjacentHTML("beforeend", `<style>.chrome-tabs.chrome-tabs-dark-theme {background: ${localStorage.getItem('tabbkg')};} .dropdown-content {background-color: ${localStorage.getItem('tabbkg')};} .mock-browser-content {background-color: ${localStorage.getItem('mockb')};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tabs-bottom-bar {background-color: ${localStorage.getItem('tabact')};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab[active] .chrome-tab-background > svg .chrome-tab-geometry {fill: ${localStorage.getItem('tabact')};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab .chrome-tab-background > svg .chrome-tab-geometry {fill: ${localStorage.getItem('tabhover')};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab[active] .chrome-tab-title {color: ${localStorage.getItem('tabacttit')};} .chrome-tabs.chrome-tabs-dark-theme .chrome-tab .chrome-tab-title {color: ${localStorage.getItem('tabinatit')};} #urlbar {background: ${localStorage.getItem('searchbar')}; color: ${localStorage.getItem('nt')}; } #createTab {color: ${localStorage.getItem('nt')}} .dropdown-content a {color: ${localStorage.getItem('nt')}} #urlbutton {color: ${localStorage.getItem('nt')}} #options {color: ${localStorage.getItem('nt')}} </style>`)
window.onbeforeunload = function () {};
//bookmarks
function AddBookmark() {
  let data = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(document.getElementById(getActiveFrameId()).contentWindow.location.href + '  ' + getBookmark() + ' ' + document.getElementById(getActiveFrameId()).contentWindow.document.title)
  data.push([document.getElementById(getActiveFrameId()).contentWindow.location.href, getBookmark(), document.getElementById(getActiveFrameId()).contentWindow.document.title]);
  localStorage.setItem('bookmarks', JSON.stringify(data));
}
function setUA(a) {
  switch (a) {
    case 'chrome':
      break
    case 'firefox':
      break
    case 'iphone':
      break
    case 'ipad':
      break
    default:
      break
  }
}
