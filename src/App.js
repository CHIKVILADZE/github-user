import './App.css';
import './index.css'
import React, { useState, useEffect } from "react";
import moon from './moon.svg';
import search from './search.svg';
import location from './location.svg';
import icon from './icon.svg';
import twittter from './twittter.svg';
import company from './company.svg';
import sun from './sun.svg'
import NightMode from './NightMode.js'




function App() {


  const[name,setName]=useState(" ");
  const[userName,setUserName]=useState(" ");
  const[followers,setFollowers]=useState(" ");
  const[following,setFollowing]=useState(" ");
  const[repos, setRepos]=useState(" ");
  const[avatar,setAvatar]=useState(" ");
  const[userInput, setUserInput]=useState(" ");
  const[inLocation, setInLocation]=useState(" ");
  const[blog, setBlog]=useState(" ");
  const[twitterUserName, setTwitterUserName]=useState("");
  const[commpany, setInCommpany]=useState("");
  const[error,setError]=useState(null);
  const[night, setNight]=useState(false);
  



  useEffect(() => {
    fetch("https://api.github.com/users/example")
    .then(res => res.json())
    .then(data =>{
      setData(data)
    })

  },[])

  const setData = ({
      name, 
      login,
      followers, 
      following,
      public_repos,
      avatar_url,
      location,
      twitter,
      blog,
      company
      
    }) => {
      setName(name)
      setUserName(login)
      setFollowers(followers)
      setFollowing(following)
      setRepos(public_repos)
      setAvatar(avatar_url)
      setInLocation(location)
      setBlog(blog)
      setInCommpany(company)
      setTwitterUserName ("twitter_username")
  }

 
  

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://api.github.com/users/${userInput}`)
    .then(res =>res.json())
    .then(data => {
      if (data.message){
        setError(data.message)
        }else{
      setData(data)
       }
    })
  } 

  const handleSearch = (e) =>{
   
    setUserInput(e.target.value)
  }

 
  const handleClick =()=>{
    setNight(!night)
    console.log(night)
  }
 
 
  return (
    <div>
      
      <header className="header">
        <h2>devfinder</h2>
        <div className="effect">
       {night ? (<span className="dark">DARK</span>):(<span className="light">LIGHT</span>)}
        {night ?
          ( <img className="moon" src={moon} alt="moon" onClick={handleClick}/> )
          :
          ( <img className="sun" src={sun} alt="sun" onClick={handleClick}/> )
          }
        </div>
      </header>
      <form className="form"  onSubmit={handleSubmit}>
        <img className="search" src={search} alt="search"/>
        
        <input className="inp" type="text" placeholder='Search GitHub username…' onChange={handleSearch} /> 
       {error ? (<p className="redtext">No Result</p>) : (!<p className="redtext"></p>)}
        <button className="btn">Search</button>
      </form>
      <section className="section">
        <div className="avatarbox">
        <img className="avatar" src={avatar}/>
              
        </div>
        <div className="sectiondata">
          
          <div className="sectionheader">
            <h1>{name}</h1>
            <span className="date">Joined 25 Jan 2011</span>
          </div>
          <span className="login">@{userName}</span>
          <p className="bio">This profile has no bio</p>
          <div className="triple">
            <div className="repos">
              <h5>Repos</h5>
              <p className="nums">{repos}</p>
            </div>
            <div className="repos">
              <h5>Followers</h5>
              <p className="nums">{followers}</p>
            </div>
            <div className="repos">
              <h5>Following</h5>
              <p className="nums">{following}</p>
            </div>
          </div>
          <div className="sectionfooter">
            <div className="doublebox">
              <div  className="one">
                <img src={location}/>
                
                  <p className="footertext">{inLocation}</p>
                
                
              </div>
              <div  className="one">
                <img src={icon}/>
              
                  <p className="footertext">{blog}</p>
                
              </div>
            </div>
            <div className="doublebox">
              <div  className="one">
                <img src={twittter}/>
               
                  <p className="footertext">Not Aviable</p>
          
              </div>
              <div  className="one">
                <img src={company}/>
              
                  <p className="footertext">{commpany}</p>
                
              </div>
            </div>
          </div>  
        </div>
      </section>  

      
   </div> 
  );
}

export default App;
