# Quoteskuy
Quoteskuy adalah sebuah rest api yang dibangun dengan menggunakan node dimana quotes tersebut diambil dari beberapa author dari dalam negeri maupun luar negeri


## Fitur ##
* Random quote
* Category quote

## API server endpoint ##
semua response yang diberikan berupa JSON. ingat,pengambilan data dari database tidak case sensitif, jadi huruf kecil dan besar tidak berpengaruh terhadap endpoint 

### GET

/api/quotes

anda akan memperoleh quote acak dalam bentuk JSON dan sebagai contoh berikut ini adalah responsenya 

```
{
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

* /api/quotes/islam
* /api/quotes/motivasi
* /api/quotes/pendidikan
* /api/quotes/novel

endpoint tersebut adalah kategori yang quoteskuy berikan dan anda akan mendapatkan data secara spesifik sesuai dengan kategori yang ada berikan pada parameternya

untuk responsenya sebagai berikut

```
{
    "data": {
        "kategori": "novel",
            "quotes": {
            "quote": "Bersabar dan diam lebih baik Jika memang jodoh akan terbuka sendiri jalan terbaiknya Jika tidak, akan diganti dengan orang yang lebih baik",
            "author": "Rindu, Tere Liye"
        }
    }
}
```

## Cobalah ##
sebagai percobaan anda dapat mengaksesnya pada url berikut ini

https://quoteskuy-65d4.vercel.app/api/quotes



## Dibuat oleh ##
Muhammad Mu'izzuddin 

akun sosial media saya - https://www.instagram.com/mzdn404/?hl=id

## LICENSE ##
anda dapat menggunakan Quoteskuy secara gratis