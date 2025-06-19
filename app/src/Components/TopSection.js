
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";

export const BASE_URL = "http://localhost:9000";
 

const TopSection = () => {

  const[data,setData] = useState(null);
  const[filteredData,setFilteredData] = useState(null);
  const[loading,setLoading] =useState(false);
  const[error,setError] = useState(false);
  const[selectedBtn,setSelectedBtn] = useState("all");



  useEffect(() => {

    const fetchFoodData = async () => {
      setLoading(true);
  
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        
  
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    
    fetchFoodData();
  },[]);

  console.log(data);

  const searchFood = (e) =>{
    const searchValue = e.target.value;

    console.log(searchValue);

    if(searchValue ==""){
      setFilteredData(null);
    }

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));

    setFilteredData(filter);
  }

  const filterFood = (type) =>{
    if(type == "all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) => food.type.toLowerCase().includes(type.toLowerCase()));
    setFilteredData(filter);
    setSelectedBtn(type);


  }

  

  if(error) return <div>{error}</div>;
  if(loading) return <div>loading......</div>;

  return (

    <>
      <Container>
        <TopConatiner>
            <div className="logo">
            <img src="/images/Foody_Zone.svg" alt="Logo" />
            </div>
            <div className="search">
                <input type="search" onChange={searchFood} placeholder="Search Food..." />
            </div>
            
        </TopConatiner>

        <FilterContainer>
            <Button onClick={()=> filterFood("all")}>All</Button>
            <Button onClick={()=> filterFood("breakFast")}>BreakFast</Button>
            <Button onClick={()=> filterFood("lunch")}>Lunch</Button>
            <Button onClick={()=> filterFood("dinner")}>Dinner</Button>
        </FilterContainer>

        
     </Container>

     <SearchResult data ={filteredData}/>

    </>
    

    
  );
};

export default TopSection;

export const Container = styled.div`
 background-color: #323334;
 max-width: 1400px;
 margin: 0 auto;
`;

const TopConatiner = styled.section`
 min-height: 140px;
 display: flex;
 justify-content: space-around;
 padding: 16px;
 align-items: center;
 margin-top: -20px;

 .search{
    input{
        background-color: gainsboro;
        border: 1px solid burlywood;
        color: black;
        border-radius: 5px;
        height: 40px;
        font-size: 16px;
        padding: 14px;
    }
 }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
    
  padding-bottom: 30px;
`;

export const Button = styled.section`
  background: #FF4343;
  border-radius: 5px;
  border: none;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
  max-width: fit-content;
  &:hover{
    background-color:rgb(241, 11, 11);
  }
   

`;

