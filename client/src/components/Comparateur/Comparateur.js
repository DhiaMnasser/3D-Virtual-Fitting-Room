import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './comparateur.css'

function Comparateur() {
  
    const [pull, setPull] = useState([])
    useEffect(() => {
     function fetchPull(){ 
     axios.get('http://threedvfr-back.herokuapp.com/scraping/pull')
        .then(response => setPull(response.data));
   console.log(pull)}
fetchPull()
    }, [])
      const [pulls, setPulls] = useState([])
    useEffect(() => {
    function fetchPulls(){   
     axios.get('http://threedvfr-back.herokuapp.com/scraping/pulls')
        .then(response => setPulls(response.data));
   console.log(pulls)}
   fetchPulls()
    }, [])
     const [pantalon, setPantalon] = useState([])
    useEffect(() => {
      function fetchPantalon(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/pantalon')
        .then(response => setPantalon(response.data));
   console.log(pantalon)}
   fetchPantalon()
    }, [])
      const [pantalons, setPantalons] = useState([])
    useEffect(() => {
      function fetchPantalons(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/pantalons')
        .then(response => setPantalons(response.data));
   console.log(pantalons)}
   fetchPantalons()
    }, [])
      const [gilet, setGilet] = useState([])
    useEffect(() => {
      function fetchGilet(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/gilet')
        .then(response => setGilet(response.data));
   console.log(gilet)}
   fetchGilet()
    }, [])
       const [gilets, setGilets] = useState([])
    useEffect(() => {
      function fetchGilets(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/gilets')
        .then(response => setGilets(response.data));
   console.log(gilets)}
   fetchGilets()
    }, [])
     const [blouson, setBlouson] = useState([])
    useEffect(() => {
      function fetchBlouson(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/blouson')
        .then(response => setBlouson(response.data));
   console.log(blouson)}
   fetchBlouson()
    }, [])
     const [blousons, setBlousons] = useState([])
    useEffect(() => {
       function fetchBlousons(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/blousons')
        .then(response => setBlousons(response.data));
   console.log(blousons)}
   fetchBlousons()
    }, [])
      const [manteau, setManteau] = useState([])
    useEffect(() => {
      function fetchManteau(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/manteau')
        .then(response => setManteau(response.data));
   console.log(manteau)}
   fetchManteau()
    }, [])
      const [manteaus, setManteaus] = useState([])
    useEffect(() => {
       function fetchManteaus(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/manteaus')
        .then(response => setManteaus(response.data));
   console.log(manteaus)}
   fetchManteaus()
    }, [])
        const [chemise, setChemise] = useState([])
    useEffect(() => {
      function fetchChemise(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/chemise')
        .then(response => setChemise(response.data));
   console.log(chemise)}
   fetchChemise()
    }, [])
          const [chemises, setChemises] = useState([])
    useEffect(() => {
      function fetchChemises(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/chemises')
        .then(response => setChemises(response.data));
   console.log(chemises)}
   fetchChemises()
    }, [])
        const [short, setShort] = useState([])
    useEffect(() => {
        function fetchShort(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/short')
        .then(response => setShort(response.data));
   console.log(short)}
   fetchShort()
    }, [])
      const [shorts, setShorts] = useState([])
    useEffect(() => {
      function fetchShorts(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/shorts')
        .then(response => setShorts(response.data));
   console.log(shorts)}
   fetchShorts()
    }, [])
      const [costume, setCostume] = useState([])
    useEffect(() => {
       function fetchCostume(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/costume')
        .then(response => setCostume(response.data));
   console.log(costume)}
    fetchCostume()
    }, [])
      const [costumes, setCostumes] = useState([])
    useEffect(() => {
 function fetchCostumes(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/costumes')
        .then(response => setCostumes(response.data));
   console.log(costumes)
 }
 fetchCostumes()
    }, [])
      const [chaussure, setChaussure] = useState([])
    useEffect(() => {
       function fetchChaussure(){
     axios.get('http://threedvfr-back.herokuapp.com/scraping/chaussure')
        .then(response => setChaussure(response.data));
   console.log(chaussure)
    }
 fetchChaussure()
    }, [])
        const [chaussures, setChaussures] = useState([])
    useEffect(() => {
      function fetchChaussures(){
    axios.get('http://threedvfr-back.herokuapp.com/scraping/chaussures')
        .then(response => setChaussures(response.data));
   console.log(chaussures)}
   fetchChaussures()
    }, [])
      const [accessoire, setAccessoire] = useState([])
    useEffect(() => {
      function fetchAccessoire(){
    axios.get('http://threedvfr-back.herokuapp.com/scraping/accessoire')
        .then(response => setAccessoire(response.data));
   console.log(accessoire)}
   fetchAccessoire()
    }, [])
       const [accessoires, setAccessoires] = useState([])
    useEffect(() => {
      function fetchAccessoires(){
    axios.get('http://threedvfr-back.herokuapp.com/scraping/accessoires')
        .then(response => setAccessoires(response.data));
   console.log(accessoires)}
   fetchAccessoires()
    }, [])
  
    return (
        <div className="table100 ver4 m-b-110">
          <div className="table100-head">
            <table>
              <thead>
                <tr className="row100 head">
                    <th className="cell100 column1" >article</th>
                    <th className="cell100 column1" >exist</th>
                    <th className="cell100 column1" >ha</th>
                    
               </tr>
             </thead>
             </table>
             </div>
             <div className="table100-body js-pscroll">
               <table>
               <tbody>
        <tr className="row100 body">
            <td className="cell100 column1" >pull</td>
            <td className="cell100 column1">{pull.moy}</td>
            <td className="cell100 column1">{pulls.moy}</td>
            
            
        </tr>
         <tr className="row100 body">
            <td className="cell100 column1">pantalon</td>
             <td className="cell100 column1">{pantalon.moy}</td>
            <td className="cell100 column1">{pantalons.moy}</td>
           
        </tr>
         <tr className="row100 body">
            <td className="cell100 column1">gilet</td>
             <td className="cell100 column1">{gilet.moy}</td>
            <td className="cell100 column1">{gilets.moy}</td>
          
        </tr>
         <tr className="row100 body">
            <td className="cell100 column1">blouson</td>
           <td className="cell100 column1">{blouson.moy}</td>
            <td className="cell100 column1">{blousons.moy}</td>
            
        </tr>
         <tr className="row100 body">
            <td className="cell100 column1">manteau</td>
             <td className="cell100 column1">{manteau.moy}</td>
            <td className="cell100 column1">{manteaus.moy}</td>
           
        </tr>
         <tr className="row100 body">
            <td className="cell100 column1">chemise</td>
             <td className="cell100 column1">{chemise.moy}</td>
            <td className="cell100 column1">{chemises.moy}</td>
           
        </tr>
        <tr className="row100 body">
            <td className="cell100 column1">shorts</td>
           <td className="cell100 column1">{short.moy}</td>
            <td className="cell100 column1">{shorts.moy}</td>
           
        </tr>
        <tr className="row100 body">
            <td className="cell100 column1">costume</td>
         <td className="cell100 column1">{costume.moy}</td>
            <td className="cell100 column1">{costumes.moy}</td>
          
        </tr>
          <tr className="row100 body">
            <td className="cell100 column1">chaussure</td>
            <td className="cell100 column1">{chaussure.moy}</td>
            <td className="cell100 column1">{chaussures.moy}</td>
            
        </tr>
            <tr className="row100 body">
            <td className="cell100 column1">accessoire</td>
   <td className="cell100 column1">  {accessoire.moy}</td>
            <td className="cell100 column1">  {accessoires.moy}</td>
        </tr>
    </tbody>
</table>
       </div>
   </div>
    )
}

export default Comparateur
