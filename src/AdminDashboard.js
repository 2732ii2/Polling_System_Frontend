import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { Space, Table, Tag } from 'antd';
import icon1 from "../src/Images/open-book.png";
import icon2 from "../src/Images/profile-user.png";

import RecentActorsIcon from '@mui/icons-material/RecentActors';
import { getCount } from './Api';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

import io from "socket.io-client";
import { AddUserSession, countofBooks } from './Redux/actions';
import LibraryHeader from './LibraryHeader';
// const Url= "http://localhost:3001/";
const Url="https://polling-application-backend.onrender.com/";
const socket =io.connect(Url);
export default function AdminDashboard() {
   const dispatch= useDispatch();
    // const [data,setdata]=useState();
  

    // if(data){
    //    dispatch(countofBooks(data));
    // }
   const select= useSelector(state=>state);
   console.log(select);
   const localSavedSession=JSON.parse(localStorage.getItem("usersession"));
  if(localSavedSession){
      if(!select?.usersession?.userprofile)
      dispatch(AddUserSession(localSavedSession)); 
  }
   const getCount=async()=>{
        try{
            const resp=await axios.get(`${Url}bookCount`);
            console.log("resp-",resp.data.data);  
            dispatch(countofBooks(resp.data.data));
        }
        catch(e){
            console.log(e?.message);
            // toast.error(e?.message);
            return {mess:e?.message};
        }
    }

    var type=select?.usersession?.userprofile?.type;
    useEffect(()=>{
        socket.emit("libraryemits",1);
        socket.emit(`sendupdatedcountofbooks`,[1,'something']);
        socket.on("updatedcountofBooks",data=>{
            console.log(data);
            dispatch(countofBooks(data));
        })
        getCount();
    },[socket])
    var options=[{name:"Dashboard", icon:HomeIcon},{
        name:"User", icon:RecentActorsIcon
    }]  
    const [selectedTabs,setSelectedTabs]=useState(options[0].name);
    console.log(selectedTabs);
    const [category,setcategory]=useState("All");
    console.log(category)
    var list_=[{name:"Total User",value:select?select?.count[2]:null},{name:"Over due Count",value:10},{name:"Total Book",value:select?select?.count[0]:null},{name:"Total Borrowed",value:select?select?.count[1]:"100"}];
  return (

    type=="admin"?
    <div className='w-[100%] h-[100vh] overflow-hidden flex flex-col'>
        <LibraryHeader />
        
        <div className='w-[100%] h-[91%] flex '>
        {/* {
            select?select?.count:null
        } */}
        <div selected={false} className='w-[10%]   unselect h-[100%] ml-4  pt-[40px] flex flex-col    cursor-pointer  text-[18px] '>
            {
                     options.map((e,i)=>{
                      console.log(selectedTabs==e?.name);
                        return  <div onClick={()=>{
                            if (e.name!=selectedTabs){
                                setSelectedTabs(e.name);
                            }
                    }} key={i} className={`flex  font-medium tracking-wider text-[black] items-center   mb-2  rounded-[20px] ${selectedTabs==e?.name?" bg-[rgba(0,0,0,.4)] text-white  ":"  "} py-2   `}>
                            
                            <e.icon className="!text-[32px] ml-[10px] pr-2"/>
                            {e.name}</div>
                     })  
            }
        </div>
        {selectedTabs=="User"?<div className="h-[100%] flex justify-center  border-[1px] border-[rgba(0,0,0,.2)]     flex-wrap gap-[20px] overflow-scroll   py-[40px] px-5 w-[85%] ml-auto mr-[0px]  ">
          {
            select?.count?.length ? select.count[3].map((e,i)=>{
              console.log(e);
              if(e?.type!="admin")
              return <div className="w-[30%] min-w-[250px] rounded-[3px] gap-2 h-[250px] bg-[rgba(0,0,0,.1)] p-5  flex flex-col  " key={i}>
                <div  className="flex justify-end items-center w-[100%] ">
                     <img src={e?.type=="user"?icon2: icon1} className="h-[30px]" />
                </div>
                <div className={`w-[100%] h-[50%] ${ !e?.BorrowedList?.length? "text-[20px]": "text-[32px]"} serif flex items-center justify-center`}>{ e?.type=="user"? !e?.BorrowedList?.length?"Borrowed : 0 ":e?.BorrowedList?.length:"-"}</div>
                     <div className="capitalize px-2 font-medium tracking-wider serif" >{e?.UserName}</div>
                     <div className="capitalize font-medium !tracking-wider sans bg-[rgba(0,0,0,.9)] py-1 px-2 text-white">{e?.Email}</div>
              </div>
            }):null
          }
        </div>:
          <div className='w-[90%] h-[100%]   flex  flex-col items-center'>
            <div className='w-[90%] h-[180px] flex !px-[20px] !py-[10px] items-center  justify-between rounded-lg border-[2px]  border-[rgba(0,0,0,.1)] mt-[5px]'>
                {
                    list_.map((e,i)=>{
                        return <div key={i} className='w-[24%] rounded-[10px] flex flex-col items-center justify-center bg-[rgba(0,0,0,.8)] h-[90%]'>
                            <h1 className='text-white text-[18px] spec  font-semibold tracking-wider'>{e.name}</h1>
                            <p className='text-white text-[26px]  font-medium mt-3'> + {e?.value}</p>
                        </div>
                    })
                }
            </div>
{/*  slit ends over here */}
                    <div className="w-[90%] flex items-center pl-[20px] mt-[20px] h-[70%] bg-[rgba(0,0,0,.2)] rounded-[20px]">
                        <div className="w-[50%] gap-4 pt-3 bg-white rounded-[20px] h-[90%] flex flex-col border-[1px] border-[white] overflow-y-hidden">
                           <div className="flex gap-3 w-[100%] pr-4 pt-2 items-center justify-end">

                            <label className="text-[18px]  font-medium tracking-wide " for="cars">Choose category</label>
        
                                <select onChange={(e)=>{
                                  console.log("=>",e.target.value);
                                    setcategory(e.target.value);
                                }} name="cars" id="cars" className="border-[1px] outline-none unselect tracking-wider border-black px-4 py-2 ">
                                <option value="All">All</option>
                                <option value="Borrowed">Borrowed</option>
                               
                                </select>
                           </div>
                            <TableUIComp data={select?.count?.length ?  category=="Borrowed"? select.count[4].filter(e=>{
                              if(e?.borrowed){
                                return e;
                              }
                            })?.slice(0,4) :select.count[4]?.slice(0,4) :[]}/>

                        </div>
                        <div className="w-[50%] h-[90%] ">
                        <PieChartdiv list={list_}/>
                        </div>
                    </div>



        </div>}

        </div>
    </div>
       :
    <div className="bg-black w-[100%]   h-[100vh] flex items-center   justify-center text-[white]  text-[25px] tracking-wider font-semibold "   > 403 Forbidden: You do not have access to this page. </div>
  )
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text className="font-bold spec tracking-wider text-[18px]" x={cx} y={cy} dy={8} textAnchor="middle" fill={'rgba(0,0,0,.8)'}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="black" className="tracking-wider font-bold text-[18px]">{`PV ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#444" className="tracking-wide font-medium text-[16px] mt-2">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
const PieChartdiv=({list})=>{
    console.log(list);
    const data = list.length?list: [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        // { name: 'Group D', value: 200 },         
      ];
    // state = {
    //     activeIndex: 0,
    //   };
    var [state,setstate]=useState({
        activeIndex: 0,
    })
   const onPieEnter = (_, index) => {
        // this.setState({
        //   activeIndex: index,
        // });
        setstate({
            ...state,activeIndex:index
        })
      };
    
    
 return   (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={150}
          fill="black"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
  ); 

}

const TableUIComp=(props)=>{
 var {data}=(props)
 var c=[];
 function dateconverter(dateString){
  // const dateString = '1993-06-17T00:00:00.000Z';
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getUTCDate().toString().padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;
  return (formattedDate);
}
const columns = [
    {
      title: 'Title',
      dataIndex: 'volumeInfo',
      key: 'volumeInfo',
      render:  (_, { volumeInfo }) =>{
        return  (<a>{volumeInfo?.title.length>10?volumeInfo.title.slice(0,10)+"...":volumeInfo.title}</a>)
      },
    },
    {
      title: 'Authors',
      dataIndex: 'volumeInfo',
      key: 'volumeInfo',
      render:  (_, { volumeInfo }) =>{
        return  (<a>{volumeInfo?.authors}</a>)
      },
    },
    {
      title: 'Category',
      dataIndex: 'volumeInfo',
      key: 'volumeInfo',
      render:  (_, { volumeInfo }) =>{
        return  (<a className="bg-[rgba(250,0,0,.2)] font-medium tracking-wide py-1 px-2 text-[red]">{volumeInfo?.categories[0]?.length>10?volumeInfo?.categories[0].slice(0,8)+"...":volumeInfo.categories[0]}</a>)
      },
    },
    {
      title: 'Published Date',
      dataIndex: 'volumeInfo',
      key: 'volumeInfo',
      render:  (_, { volumeInfo }) =>{
        return  (<a className="bg-[rgba(0,0,0,.5)]  !min-w-[200px] font-medium tracking-wide py-1 rounded-[10px] px-2 text-[white]">{dateconverter(volumeInfo?.publishedDate)}</a>)
      },
    },
    // publishedDate
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
   ];
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];
    return <Table columns={columns} dataSource={data} />
}
