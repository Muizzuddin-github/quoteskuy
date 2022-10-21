# Quoteskuy
Quoteskuy adalah sebuah rest api yang dibangun dengan menggunakan node dimana quotes tersebut diambil dari beberapa author dari dalam negeri maupun luar negeri


## Fitur ##
* Random quote
* Category quote

## API server endpoint ##
semua response yang diberikan berupa JSON. ingat,pengambilan data dari database tidak case sensitif, jadi huruf kecil dan besar tidak berpengaruh terhadap endpoint 

### Quote acak

* /api/quotes

sebelum anda akan mengakses Quoteskuy, anda harus membuat API ID dan API KEY terlebih dahulu
anda bisa menunjungi documentasi dari Quoteskuy pada tautan About disebelah kanan

anda akan memperoleh quote acak dalam bentuk JSON dan sebagai contoh berikut ini adalah responsenya 

```javascript
const options = {
    headers : {
        "X-API-ID" : "api id",
        "X-API-KEY" : "api key"
    }
}
fetch('https://quoteskuy-65d4.vercel.app/api/quotes',options)
 .then(res => res.json())
 .then(quotes => console.log(quotes))
```

```json
{
    "msg" : "success",
    "data": {
        "kategori": "islam",
        "quotes": {
            "quote": " Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya  ",
            "author": "QS Al-Baqarah: 286"
        }
    }
}
```

### Kategori

* islam
* motivasi
* pendidikan
* novel

anda akan mendapatkan data secara spesifik sesuai dengan kategori yang ada berikan,anda dapat menambahkan query string pada
url seperti dibawah ini

https://quoteskuy-65d4.vercel.app/api/quotes?category=novel

untuk responsenya sebagai berikut

```json
{
    "msg" : "success",
    "data": {
        "kategori": "novel",
            "quotes": {
            "quote": "Bersabar dan diam lebih baik Jika memang jodoh akan terbuka sendiri jalan terbaiknya Jika tidak, akan diganti dengan orang yang lebih baik",
            "author": "Rindu, Tere Liye"
        }
    }
}
```

### Quote hari ini

* /api/quotes/today

anda akan memperoleh quote hari ini, dimana quote hari ini akan melakukan reset quote setiap hari secara otomatis pada saat melakukan request
untuk responsenya sebagai berikut

```javascript
const options = {
    headers : {
        "X-API-ID" : "api id",
        "X-API-KEY" : "api key"
    }
}
fetch('https://quoteskuy-65d4.vercel.app/api/quotes/today',options)
 .then(res => res.json())
 .then(quotes => console.log(quotes))
```

```json
{
    "msg" : "success",
    "data": {
        "kategori": "islam",
        "quotes": {
            "quote": " Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum hingga mereka merubah keadaan yang ada pada diri mereka sendiri ",
            "author": "QS Ar Rad: 11"
        }
    }
}
```

## Cobalah ##
sebagai percobaan anda dapat mengaksesnya pada url berikut ini
dan jangan lupa tambahkan API ID dan API KEY

https://quoteskuy-65d4.vercel.app/api/quotes



## Dibuat oleh ##
Muhammad Mu'izzuddin 

akun sosial media saya - https://www.instagram.com/mzdn404/?hl=id

## LICENSE ##
anda dapat menggunakan Quoteskuy secara gratis