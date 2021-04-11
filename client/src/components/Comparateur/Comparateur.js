import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './comparateur.css'
function Comparateur() {
  
    const [pull, setPull] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/pull')
        .then(response => setPull(response.data));
   console.log(pull)
    }, [])
      const [pulls, setPulls] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/pulls')
        .then(response => setPulls(response.data));
   console.log(pulls)
    }, [])
     const [pantalon, setPantalon] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/pantalon')
        .then(response => setPantalon(response.data));
   console.log(pantalon)
    }, [])
      const [pantalons, setPantalons] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/pantalons')
        .then(response => setPantalons(response.data));
   console.log(pantalons)
    }, [])
      const [gilet, setGilet] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/gilet')
        .then(response => setGilet(response.data));
   console.log(gilet)
    }, [])
       const [gilets, setGilets] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/gilets')
        .then(response => setGilets(response.data));
   console.log(gilets)
    }, [])
     const [blouson, setBlouson] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/blouson')
        .then(response => setBlouson(response.data));
   console.log(blouson)
    }, [])
     const [blousons, setBlousons] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/blousons')
        .then(response => setBlousons(response.data));
   console.log(blousons)
    }, [])
      const [manteau, setManteau] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/manteau')
        .then(response => setManteau(response.data));
   console.log(manteau)
    }, [])
      const [manteaus, setManteaus] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/manteaus')
        .then(response => setManteaus(response.data));
   console.log(manteaus)
    }, [])
        const [chemise, setChemise] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/chemise')
        .then(response => setChemise(response.data));
   console.log(chemise)
    }, [])
          const [chemises, setChemises] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/chemises')
        .then(response => setChemises(response.data));
   console.log(chemises)
    }, [])
        const [short, setShort] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/short')
        .then(response => setShort(response.data));
   console.log(short)
    }, [])
      const [shorts, setShorts] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/shorts')
        .then(response => setShorts(response.data));
   console.log(shorts)
    }, [])
      const [costume, setCostume] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/costume')
        .then(response => setCostume(response.data));
   console.log(costume)
    }, [])
      const [costumes, setCostumes] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/costumes')
        .then(response => setCostumes(response.data));
   console.log(costumes)
    }, [])
      const [chaussure, setChaussure] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/chaussure')
        .then(response => setChaussure(response.data));
   console.log(chaussure)
    }, [])
        const [chaussures, setChaussures] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/chaussures')
        .then(response => setChaussures(response.data));
   console.log(chaussures)
    }, [])
      const [accessoire, setAccessoire] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/accessoire')
        .then(response => setAccessoire(response.data));
   console.log(accessoire)
    }, [])
       const [accessoires, setAccessoires] = useState([])
    useEffect(() => {
      
    axios.get('http://threedvfr-back.herokuapp.com/scraping/accessoires')
        .then(response => setAccessoires(response.data));
   console.log(accessoires)
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
            <td className="cell100 column1">chaussure</td>
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
