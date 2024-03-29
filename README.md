<div align="center">
  <h1 style="font-size: 100px">🤵</h1>
  <h1>Classy Image URL Getter</h1>
  <p>A bookmarklet to quickly scrape URLs from Google image results for deep learning classification problems and more!</p>
  <p>
    <a href="https://github.com/ozramos/classy-image-url-getter">
      <img src="https://img.shields.io/github/release/ozramos/classy-image-url-getter">
    </a>
    <a href="https://github.com/ozramos/classy-image-url-getter">
      <img src="https://img.shields.io/github/last-commit/ozramos/classy-image-url-getter">
    </a>
  </p>
  <p><img src="https://i.imgur.com/rYbLeJT.png"></p>
</div>

# Features

- Easily <kbd>Add 👍</kbd> or <kbd>Remove 👎</kbd> images
- Download files, even with adblock
- Handles infinite scroll

# How to use

**See the video tutorial:** https://youtu.be/XrvAm9VQhgU

- Create a new bookmark and enter the below code into the URL field
- Go to Google's image search
- Click on the bookmarklet to start the process
- Click <kbd>Add more</kbd> to add the next batch of images after scrolling
- Click <kbd>Download 💾</kbd> to download a `\n` separated .txt file

```
javascript:(function()%7B%2F**%0A%20*%20Scan%20for%20unparsed%20images%0A%20*%20-%20Applies%20%22.parsed%22%20so%20that%20we%20don't%20parse%20it%20again%0A%20*%20-%20Adds%20a%20%F0%9F%91%8D%F0%9F%91%8E%20button%20to%20toggle%20image%0A%20*%2F%0Aconst%20classyImages%20%3D%20%5B%5D%3B%0Aconst%20parseImages%20%3D%20function()%20%7B%0A%20%20const%20%24imgs%20%3D%20document.querySelectorAll(%0A%20%20%20%20%22.rg_di%3Anot(.classy-parsed)%20.rg_meta%22%0A%20%20)%3B%0A%0A%20%20%24imgs.forEach(el%20%3D%3E%20%7B%0A%20%20%20%20const%20%24parent%20%3D%20el.parentElement%3B%0A%20%20%20%20const%20index%20%3D%20classyImages.length%3B%0A%0A%20%20%20%20%24parent.classList.add(%22classy-parsed%22)%3B%0A%20%20%20%20%24parent.style.marginBottom%20%3D%20%2260px%22%3B%0A%20%20%20%20classyImages.push(%7B%0A%20%20%20%20%20%20%24parent%2C%0A%20%20%20%20%20%20url%3A%20JSON.parse(el.textContent).ou%2C%0A%20%20%20%20%20%20isSelected%3A%20true%0A%20%20%20%20%7D)%3B%0A%0A%20%20%20%20%2F%2F%20Create%20and%20style%20the%20toggle%0A%20%20%20%20const%20%24toggle%20%3D%20document.createElement(%22button%22)%3B%0A%20%20%20%20%24toggle.classList.add(%22classy-toggle%22)%3B%0A%20%20%20%20%24toggle.textContent%20%3D%20%22%F0%9F%91%8D%22%3B%0A%20%20%20%20%24toggle.style.fontSize%20%3D%20%2218px%22%3B%0A%20%20%20%20%24toggle.style.width%20%3D%20%22100%25%22%3B%0A%20%20%20%20%24parent.appendChild(%24toggle)%3B%0A%0A%20%20%20%20%2F%2F%20Toggle%20the%20class%20and%20update%20our%20list%20of%20images%0A%20%20%20%20%24toggle.addEventListener(%22click%22%2C%20()%20%3D%3E%20%7B%0A%20%20%20%20%20%20classyImages%5Bindex%5D.isSelected%20%3D%20!classyImages%5Bindex%5D.isSelected%3B%0A%20%20%20%20%20%20%24toggle.textContent%20%3D%20classyImages%5Bindex%5D.isSelected%20%3F%20%22%F0%9F%91%8D%22%20%3A%20%22%F0%9F%91%8E%22%3B%0A%20%20%20%20%20%20%24parent.style.opacity%20%3D%20classyImages%5Bindex%5D.isSelected%20%3F%201%20%3A%200.35%3B%0A%20%20%20%20%20%20updateImageList()%3B%0A%20%20%20%20%7D)%3B%0A%20%20%7D)%3B%0A%0A%20%20updateImageList()%3B%0A%7D%3B%0A%0A%2F**%0A%20*%20Updates%20the%20image%20list%0A%20*%2F%0Aconst%20updateImageList%20%3D%20function()%20%7B%0A%20%20let%20urls%20%3D%20%22%22%3B%0A%0A%20%20%24text.value%20%3D%20classyImages.forEach(image%20%3D%3E%20%7B%0A%20%20%20%20if%20(image.isSelected)%20urls%20%2B%3D%20%60%24%7Bimage.url%7D%5Cn%60%3B%0A%20%20%7D)%3B%0A%0A%20%20%24text.value%20%3D%20urls%3B%0A%20%20updateImageCount()%3B%0A%7D%3B%0A%0A%2F**%0A%20*%20Update%20the%20image%20counter%0A%20*%2F%0Aconst%20updateImageCount%20%3D%20function()%20%7B%0A%20%20let%20count%20%3D%200%3B%0A%0A%20%20classyImages.forEach(image%20%3D%3E%20%7B%0A%20%20%20%20if%20(image.isSelected)%20count%2B%2B%3B%0A%20%20%7D)%3B%0A%0A%20%20%24numURLs.textContent%20%3D%20count%20%2B%20%22%20images%22%3B%0A%7D%3B%0A%0A%2F**%0A%20*%20Main%20UI%0A%20*%2F%0Aconst%20%24container%20%3D%20document.createElement(%22div%22)%3B%0A%24container.style.position%20%3D%20%22fixed%22%3B%0A%24container.style.left%20%3D%20%220%22%3B%0A%24container.style.bottom%20%3D%20%220%22%3B%0A%24container.style.zIndex%20%3D%20%229999%22%3B%0A%24container.style.width%20%3D%20%22100%25%22%3B%0A%24container.style.padding%20%3D%20%2220px%22%3B%0A%24container.style.boxSizing%20%3D%20%22border-box%22%3B%0A%24container.style.background%20%3D%20%22rgba(255%2C%20255%2C%20255%2C%200.85)%22%3B%0Adocument.body.appendChild(%24container)%3B%0A%0A%2F%2F%20Add%20Filename%0Aconst%20%24filename%20%3D%20document.createElement(%22input%22)%3B%0A%24filename.setAttribute(%22type%22%2C%20%22input%22)%3B%0A%24filename.style.width%20%3D%20%22200px%22%3B%0A%24filename.style.padding%20%3D%20%223px%22%3B%0A%24filename.style.fontSize%20%3D%20%2218px%22%3B%0A%24filename.style.marginRight%20%3D%20%2220px%22%3B%0A%24filename.value%20%3D%20%22image-urls.txt%22%3B%0A%24container.appendChild(%24filename)%3B%0A%0A%2F%2F%20Add%20more%20button%0Aconst%20%24addMore%20%3D%20document.createElement(%22button%22)%3B%0A%24addMore.textContent%20%3D%20%22Add%20More%20%F0%9F%96%BC%22%3B%0A%24addMore.style.fontSize%20%3D%20%2218px%22%3B%0A%24addMore.style.marginBottom%20%3D%20%2220px%22%3B%0A%24addMore.style.marginRight%20%3D%20%2220px%22%3B%0A%24container.appendChild(%24addMore)%3B%0A%0A%2F%2F%20Download%20button%0Aconst%20%24download%20%3D%20document.createElement(%22button%22)%3B%0A%24download.textContent%20%3D%20%22Download%20%F0%9F%92%BE%22%3B%0A%24download.style.fontSize%20%3D%20%2218px%22%3B%0A%24download.style.marginBottom%20%3D%20%2220px%22%3B%0A%24container.appendChild(%24download)%3B%0A%0A%2F%2F%20Number%20of%20files%20indicator%0Aconst%20%24numURLs%20%3D%20document.createElement(%22span%22)%3B%0A%24numURLs.style.float%20%3D%20%22right%22%3B%0A%24numURLs.style.fontSize%20%3D%20%2218px%22%3B%0A%24numURLs.style.after%20%3D%20%2220px%22%3B%0A%24numURLs.textContent%20%3D%20%22%22%3B%0A%24container.appendChild(%24numURLs)%3B%0A%0A%2F%2F%20Textarea%0Aconst%20%24text%20%3D%20document.createElement(%22textarea%22)%3B%0A%24text.style.display%20%3D%20%22block%22%3B%0A%24text.style.width%20%3D%20%22100%25%22%3B%0A%24text.style.height%20%3D%20%22150px%22%3B%0A%24container.appendChild(%24text)%3B%0A%0A%2F**%0A%20*%20Add%20More%0A%20*%2F%0A%24addMore.addEventListener(%22click%22%2C%20()%20%3D%3E%20%7B%0A%20%20parseImages()%3B%0A%7D)%3B%0A%0A%2F**%0A%20*%20Handle%20download%0A%20*%2F%0A%24download.addEventListener(%22click%22%2C%20()%20%3D%3E%20%7B%0A%20%20let%20%24a%20%3D%20document.createElement(%22a%22)%3B%0A%20%20let%20file%20%3D%20new%20Blob(%5B%24text.value%5D%2C%20%7B%0A%20%20%20%20type%3A%20%22application%2Ftext%22%0A%20%20%7D)%3B%0A%20%20%24a.href%20%3D%20URL.createObjectURL(file)%3B%0A%20%20%24a.download%20%3D%20%24filename.value%3B%0A%20%20%24a.click()%3B%0A%20%20%24a.remove()%3B%0A%7D)%3B%0A%0A%2F**%0A%20*%20Finally%2C%20run%20everything%20once%0A%20*%2F%0AparseImages()%3B%7D)()%3B
```

# Creating a bookmarklet from source

Copy `source.js` into this form: https://caiorss.github.io/bookmarklet-maker/ . **Special Note:** This is one of the few bookmarklet generators that I could get to work with both comments and ES6.

# Roadmap

- Save to localstorage to allow for combining search results
- Add image from the "related images" panel shown when you click an image
- PR requests welcome

# Changelog

- 8/17 - Added a filename field and displays number of selected images
