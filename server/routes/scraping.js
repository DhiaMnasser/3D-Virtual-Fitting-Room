const express= require("express");
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');
var JSSoup = require('jssoup').default;

pulls=['https://www.ha.com.tn/femme/sweater/sweat-shirt.html',
'https://www.ha.com.tn/femme/sweater/sweat-zippe.html',
'https://www.ha.com.tn/femme/sweater/pull-basique-ml.html',
'https://www.ha.com.tn/femme/sweater/pull-fantaisie-ml.html',
'https://www.ha.com.tn/homme/sweater/sweat-shirt.html',
'https://www.ha.com.tn/homme/sweater/sweat-zippe.html',
'https://www.ha.com.tn/homme/sweater/pull-basique-ml.html',
'https://www.ha.com.tn/homme/sweater/pull-fantaisie-ml.html']
pantalons=[
    'https://www.ha.com.tn/homme/pantalon/chinos-pantalons.html',
'https://www.ha.com.tn/homme/pantalon/pantalon-formel.html',
'https://www.ha.com.tn/homme/pantalon/pantalon-jog.html',
'https://www.ha.com.tn/homme/pantalon/jean-jec.html',
'https://www.ha.com.tn/femme/pantalon/chinos-pantalons.html',
'https://www.ha.com.tn/femme/pantalon/pantalon-lin.html',
'https://www.ha.com.tn/femme/pantalon/pantalon-formel.html',
'https://www.ha.com.tn/femme/pantalon/pantalon-jog.html',
'https://www.ha.com.tn/femme/pantalon/jean.html',
'https://www.ha.com.tn/femme/pantalon/pantacheville.html'
]
gilets=['https://www.ha.com.tn/femme/gilet/gilet-court.html',
'https://www.ha.com.tn/femme/gilet/gilet-long.html',
'https://www.ha.com.tn/femme/gilet/bolero.html',
'https://www.ha.com.tn/homme/gilet.html']
blousons=['https://www.ha.com.tn/homme/outwear/veste.html',
'https://www.ha.com.tn/homme/outwear/manteau.html',
'https://www.ha.com.tn/homme/outwear/blouson.html',
'https://www.ha.com.tn/homme/outwear/doudoune.html',
'https://www.ha.com.tn/homme/outwear/coupe-vent.html',
'https://www.ha.com.tn/homme/outwear/jacket.html',
'https://www.ha.com.tn/homme/outwear/teddy.html']
manteaus=['https://www.ha.com.tn/femme/manteau-femme-23546.html',
'https://www.ha.com.tn/femme/outwear/veste.html',
'https://www.ha.com.tn/femme/outwear/parka-trench.html',
'https://www.ha.com.tn/femme/outwear/blouson.html',
'https://www.ha.com.tn/femme/outwear/doudoune.html',
'https://www.ha.com.tn/femme/outwear/teddy.html']
chemises=['https://www.ha.com.tn/femme/chemise/chemise-ml.html',
         'https://www.ha.com.tn/femme/chemise/blouse-mc.html',
         'https://www.ha.com.tn/femme/chemise/blouse-ml.html',
         'https://www.ha.com.tn/femme/chemise/liquette-ml.html',
        'https://www.ha.com.tn/homme/chemise.html'
    
    ]
shorts=[
'https://www.ha.com.tn/femme/short-bermuda.html']
costumes=['https://www.ha.com.tn/homme/costume.html']
chaussures=['https://www.ha.com.tn/homme/chaussures/baskets.html',
'https://www.ha.com.tn/homme/chaussures/boots.html',
'https://www.ha.com.tn/homme/chaussures/derby.html',
'https://www.ha.com.tn/homme/chaussures/mules.html',
'https://www.ha.com.tn/homme/chaussures/tennis.html',
'https://www.ha.com.tn/femme/chaussures/boots.html',
'https://www.ha.com.tn/femme/chaussures/derby.html',
'https://www.ha.com.tn/femme/chaussures/mules.html'
]
accessoires=['https://www.ha.com.tn/femme/accessoires/echarpe.html',
         'https://www.ha.com.tn/femme/accessoires/chaussettes.html',
         'https://www.ha.com.tn/homme/accessoires.html']


pull={link:['https://www.exist.com.tn/215-pulls-polos?page='],page:11}
pantalon={link:['https://www.exist.com.tn/208-pantalons?page='],page:4}
gilet={link:['https://www.exist.com.tn/219-gilets?page='],page:3}
blouson={link:['https://www.exist.com.tn/205-blousons?page='],page:2}
manteau={link:['https://www.exist.com.tn/245-manteau?page='],page:1}
chemise={link:['https://www.exist.com.tn/206-chemises?page='],page:4}
short={link:['https://www.exist.com.tn/236-short?page='],page:1}
costume={link:['https://www.exist.com.tn/221-costumes?page='],page:1}
chaussure={link:['https://www.exist.com.tn/209-chaussures?page='],page:6}
accessoire={link:['https://www.exist.com.tn/212-accessoires?page='],page:9}
router.get('/pulls', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:pulls}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
router.get('/pantalons', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:pantalons}
		);

    
      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
 router.get('/gilets', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:gilets}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
router.get('/blousons', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:blousons}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
router.get('/manteaus', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:manteaus}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
router.get('/chemises', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:chemises}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })   
router.get('/shorts', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:shorts}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    }) 
router.get('/costumes', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:costumes}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    }) 
router.get('/chaussures', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:chaussures}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    }) 
router.get('/accessoires', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:accessoires}
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*1000)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    }) 
//exist
router.get('/pull', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           pull
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
router.get('/pantalon', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           pantalon
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
 router.get('/gilet', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           gilet
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
router.get('/blouson', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           blouson
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
router.get('/manteau', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           manteau
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
router.get('/chemise', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           chemise
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })   
router.get('/short', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           short
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    }) 
router.get('/costume', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           costume
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    }) 
router.get('/chaussure', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           chaussure
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    }) 
router.get('/accessoire', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           accessoire
		);

      datas=data
       var i=0;
       var j=0;
      datas.forEach((dat)=>{i=Number(dat.prix.replace(",",""))+i ; j=j+1 })
       moy=i/(j*100)
    data={data,moy}
     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })
 router.get('/ha', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/ha',
           {link:[...pulls,
            ...pantalons,
            ...gilets,
            ...blousons,
            ...manteaus,
            ...chemises,
            ...shorts,
            ...costumes,
            ...chaussures,
            ...accessoires
        
        
        ]}
		);

     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })   
    router.get('/exist', async(req,res)=>{
    try{
var { data } = await axios.post(
			'https://three-vfr-p.herokuapp.com/exist',
           {link:[pull[0].link,
            pantalon[0].link,
            gilet[0].link,
            blouson[0].link,
            manteau[0].link,
            chemise[0].link,
            short[0].link,
            costume[0].link,
            chaussure[0].link,
            accessoire[0].link
         ],page:[pull[0].page,
            pantalon[0].page,
            gilet[0].page,
            blouson[0].page,
            manteau[0].page,
            chemise[0].page,
            short[0].page,
            costume[0].page,
            chaussure[0].page,
            accessoire[0].page]}
		);

     res.status(201).json(data)
  }catch (err){
      res.status(500).json({message:err.message})
  }
    })   
//exist 
//http://localhost:5000/scraping/pull
//http://localhost:5000/scraping/pantalon
//http://localhost:5000/scraping/gilet
//http://localhost:5000/scraping/blouson
//http://localhost:5000/scraping/manteau
//http://localhost:5000/scraping/chemise
//http://localhost:5000/scraping/short
//http://localhost:5000/scraping/costume
//http://localhost:5000/scraping/chaussure
//http://localhost:5000/scraping/accessoire
//ha
//http://localhost:5000/scraping/pulls
//http://localhost:5000/scraping/pantalons
//http://localhost:5000/scraping/gilets
//http://localhost:5000/scraping/blousons
//http://localhost:5000/scraping/manteaus
//http://localhost:5000/scraping/chemises
//http://localhost:5000/scraping/shorts
//http://localhost:5000/scraping/costumes
//http://localhost:5000/scraping/chaussures
//http://localhost:5000/scraping/accessoires
module.exports= router;