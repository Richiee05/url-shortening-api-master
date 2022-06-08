const input = document.querySelector("#shorten");
const btn = document.querySelector(".btn-form");
const form = document.querySelector(".form");
const url = "https://api.shrtco.de/";
const shorten = "v2/shorten?url=";
const results = document.querySelector("#results");
const copyBtn = document.querySelector(".copy");
const orgResult = document.querySelector(".org-link");
const shortResult = document.querySelector(".short-link");
const orgCon = document.querySelector(".org-con");
const noInp = document.querySelector(".no-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value === "" || input.value === null) {
    noInp.classList.remove("d-none");
  } else {
    fetchdata(`${url}${shorten}${input.value}`);
    noInp.classList.add("d-none");
  }
});
const fetchdata = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  displayResults(data);
};

//FOR DISPLAYING THE RESULTS
const displayResults = (data) => {
  if (data.ok) {
    let link = {
      unqid: new Date().getTime().toString(),
      orgLink: data.result.original_link,
      shortLink: data.result.full_short_link,
    };
    orgResult.textContent = link.orgLink;
    shortResult.textContent = link.shortLink;
    results.classList.replace("d-none", "d-block");
    copyBtn.classList.remove("d-none");
    orgCon.classList.remove("justify-content-center");
     copyBtn.textContent = "Copy";
    //FOR COPYING THE SHORTENED LINK INTO THE CLIPBOARD
    
 

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(shortResult.textContent);
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copy-bg");
    });
  } else {
    copyBtn.classList.add("d-none");
    orgCon.classList.replace(
      "justify-content-between",
      "justify-content-center"
    );
    copyBtn.classList.remove("copy-bg");
    orgResult.textContent = "NO SHORT LINK WAS FOUND";
    shortResult.innerHTML = null;
    results.classList.replace("d-none", "d-block");
  }
};
