import React from 'react'
import { useEffect,useState } from 'react'
import Item from './Item'

const UserTable = ({ data }) => {
    return (
      <div className="user-table">
        {data.map(customer => (
          <div key={customer.id} className="user-row">
            <div className="user-info">
              <span className='field'>  ID: {customer.id}  </span>
              <span className='field'>  Name: {customer.name}  </span>
              <span className='field'>  Address: {customer.address}  </span>
              
            </div>
          </div>
        ))}
      </div>
    );
  };

function Search() {
  const [loading,setLoading] = useState(null)
  const [data,setData] = useState([])
  const searchByPostcode = async ()=>{
    setLoading(true)
    console.log('postcode search......');
    var postcode = document.getElementById("search-01").value
    var link = 'http://localhost:4000/postcodes?postcode='+postcode
    console.log("link: "+link);
    fetch(link).then(response => response.json()).then(data =>{
        setData(data)
        setLoading(false)
        console.log(data);
    }).catch(error =>{
        'ERORR FETCHING',error
    })
  }
  const searchByPostcodeAndAddress = async ()=>{
    console.log('postcode and address search ');
    var postcode = document.getElementById("search-05").value
    var address = document.getElementById("search-06").value
    var link = 'http://localhost:4000/postcode&address?postcode='+postcode+'&address='+address
    console.log("link: "+link);
    fetch(link).then(response => response.json()).then(datas =>{
        setData(datas)
        console.log(datas);
    }).catch(error =>{
        'error fetching', error
    })
  

  }

  const searchByNameAndTown = async ()=>{
    console.log('name and town search');
    var firstName = document.getElementById("search-02").value
    var lastName = document.getElementById("search-03").value
    var name = firstName+' '+lastName
    var town = document.getElementById("search-04").value
    var link = 'http://localhost:4000/name&town?name='+name+'&town='+town
    console.log("link: "+link);
    fetch(link).then(response => response.json()).then(datas =>{
        setData(datas)
        console.log(datas);
    }).catch(error =>{
        'error fetching', error
    })
  }

  return (
    <div className="Search">
        <div className="header">LIVE LOOKUP</div>
        <div className="container">
            <div className="card">
                <p className='sp'>Search By Postcode</p>
                <input id='search-01' type="text" placeholder="Search" />
                <button className="Sbtn" onClick={searchByPostcode}>Search</button>
            </div>
            <div className="card">
                <p className='sp'>Search By Name And Town</p>
                <input id='search-02'  type="text" placeholder="Enter First Name" />
                <input id='search-03'  type="text" placeholder="Enter Last Name" />
                <input id='search-04'  type="text" placeholder="Enter Town" />
                <button className="Sbtn" onClick={searchByNameAndTown}>Search</button>
            </div>
            <div className="card">
                <p className='sp'>Search By Postcode And Address</p>
                <input id='search-05' type="text" placeholder="Enter Postcode" />
                <input id='search-06' type="text" placeholder="Enter The Address" />
                <button className="Sbtn" onClick={searchByPostcodeAndAddress}>Search</button>
            </div>
        </div>
        
        {loading ? (
                <p></p>
            ) : (
                <div className='sp res'>Results: {data.length}</div>
            ) }
        <div className="results">
            
            {data.length > 0 ? (
                data.map((item)=>{
                    return <Item key={item.id} postcode={item.postcode} name={item.name} address={item.address} occupants={item.occupants} town={item.town}></Item>
                })
            ) : (
                <p></p>
            )}
        </div>
        
    </div>
  )
}

export default Search