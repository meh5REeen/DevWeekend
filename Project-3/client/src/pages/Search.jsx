import React, { useEffect } from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Card from '../Components/Card';
export default function Search() {
    const [sidebardata,setSidebardata] = useState(
        {
            searchTerm:'',
            type:'all',
            parking:false,
            furnished:false,
            offer:false,
            sort:'created_at',
            order:'desc'
        }
    )
    const [loading,setLoading] = useState(false);
    const [listing,setListing] = useState([]);
    const [showMore , setshowMore] = useState(false);
    
    const onShowMoreClick = async()=>{
        const numberofListings = listing.length;
        const startIndex = numberofListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex',startIndex);
        const searchQuery = urlParams.toString();
        const res =  await fetch(`http://localhost:3000/api/listing/get?${searchQuery}`,{
            method:'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
        })
        const data=  await res.json();
        if(data.length < 9){
            setshowMore(false);
        }
        setListing([...listing,...data]);
    }
    const token = localStorage.getItem('access_token');
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        if(
            searchTermFromUrl || 
            typeFromUrl||
            parkingFromUrl||
            furnishedFromUrl||
            offerFromUrl||
            sortFromUrl||
            orderFromUrl

        ){
            setSidebardata(
                {
                    searchTerm:searchTermFromUrl||"",
                    type:typeFromUrl||"all",
                    parking:parkingFromUrl === 'true' ? true : false,
                    furnished :furnishedFromUrl === 'true' ? true : false,
                    offer:offerFromUrl==='true' ? true : false,
                    sort:sortFromUrl || 'created_At',
                    order:orderFromUrl||'desc',
                }
            );
        }
        const fetchListing = async () =>{
            setLoading(true);
            const searchQuery=urlParams.toString();
            const res = await fetch(`http://localhost:3000/api/listing/get?${searchQuery}`,{
                method:'GET',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }

            })
            const data = await res.json();
            if(data.length > 8) {
                setshowMore(true);
            }
            setListing(data);
            setLoading(false);
        }
    fetchListing();
    },[location.search])



    console.log(sidebardata)
    const navigate = useNavigate();
    const handleChange = (e) => {
  const { id, checked, value } = e.target;

  if (id === 'all' || id === 'rent' || id === 'sale') {
    setSidebardata({ ...sidebardata, type: id });
  }

  if (id === 'searchTerm') {
    setSidebardata({ ...sidebardata, searchTerm: value });
  }

  if (id === 'parking' || id === 'furnished' || id === 'offer') {
    setSidebardata({ ...sidebardata, [id]: checked });
  }

  if (id === 'sort_order') {
    const [sort, order] = value.split('_');
    setSidebardata({ ...sidebardata, sort, order });
  }
};

const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams =  new URLSearchParams();
    urlParams.set('searchTerm',sidebardata.searchTerm);
    urlParams.set('type',sidebardata.type);
    urlParams.set('parking',sidebardata.parking);
    urlParams.set('furnished',sidebardata.furnished)
    urlParams.set('offer',sidebardata.offer)
    urlParams.set('sort',sidebardata.sort)
    urlParams.set('order',sidebardata.order)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
}

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 sm:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div  className='flex items-center gap-2'>
                    <label className='whiteSpace-nowrap'>Search Term</label>
                    <input type = "text"
                    id='searchTerm'
                    placeholder='Search'
                    className='border rounded-lg p-3 w-full'
                    value={sidebardata.searchTerm}
                    onChange={handleChange}
                    />
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                        <input type = "radio" id = "all" 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'all'}
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type = "radio" id = "rent" 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'rent'}/>
                        
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type = "radio" id = "sale" 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'sale'}/>
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type = "checkbox" id = "offer" 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.offer}/>
                        <span>Offer</span>
                    </div>
                </div>
                <label className='font-semibold'>Amenities</label>
                    <div className='flex gap-2'>
                        <input type = "checkbox" id = "parking" 
                        className='w-5'
                         onChange={handleChange}
                        checked={sidebardata.parking}/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type = "checkbox" id = "furnished" 
                        className='w-5'
                         onChange={handleChange}
                        checked={sidebardata.furnished}/>
                        <span>Furnished</span>
                    </div>

                    <div className=''>
                        <label className='font-semibold'>Sort:</label>
                        <select onChange={handleChange} 
                        defaultValue={'created_at_desc'}
                        id = "sort_order"
                        className='border rounded-lg p-3 w-full'>
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>

                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 '>Search</button>
                   
            </form>
      </div>
      <div className='flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Results</h1>
            <div className='p-7'>
                {!loading && listing.length === 0 && (
                    <p className='text-xl text-slate-700'> No listing Found</p>
                )}
                {loading && (
                    <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                )}
                {!loading && listing && listing.map((listin) => {
                    return <Card key={listin._id} listing={listin} />;
                })}

                {showMore && (
                    <button onClick={()=>{
                        onShowMoreClick();
                    }}
                    className='text-green-700 hover:underline p-7 text-center w-full '>Show More</button>
                )}
                </div>    
      </div>    
    </div>
  )
}
