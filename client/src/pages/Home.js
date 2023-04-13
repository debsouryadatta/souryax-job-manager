import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [position, setPosition] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState('')
  const [loggedin, setLoggedin] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token);
    axios.get('http://localhost:5000/api/v1/jobs/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => {
      setJobs(data.data.jobs)
      // console.log(data.data.jobs);
      (data.data.jobs && setLoggedin(true))
    }).catch(function (error) {
      // console.log(error);
    });
  }, [])
  

  const createJob = async () => {
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/jobs/', {
        position: position,
        company: company,
        status: status
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(data);
      setJobs([...jobs,data])
    } catch (error) {
      // console.log(error);
    }
    setPosition('')
    setCompany('')
    setStatus('')
  }

  const deleteJob = async (id)=>{
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.delete(`http://localhost:5000/api/v1/jobs/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log(data);
      setJobs(jobs.filter((job)=> job._id!=id))
    } catch (error) {
      // console.log(error);
    }
  }

  const logOut = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      {loggedin?(
        <div>
        
      {/* NAVBAR */}
      <div className="">
        <nav
          className="relative px-8 py-4 flex justify-between items-center border-y border-gray-400 dark:border-gray-700">
          <a
            className="text-3xl font-bold leading-none flex items-center space-x-4"
            href="#">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#4F46E5"
                className="w-8 h-8">
                <path
                  fill-rule="evenodd"
                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                  clip-rule="evenodd"></path>
                <path
                  d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z"></path>
              </svg>
            </span>
            <span className="text-gray-600 dark:text-gray-300 text-xl">SOURYAX</span>
          </a>

          <button onClick={logOut}
            className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
            Log Out
          </button>


        </nav>
      </div>


      {/* INPUT */}
      <div className='flex justify-center items-center my-10'>
        <div className='flex w-[80vw] p-4 bg-indigo-950 flex-wrap md:flex-nowrap'>

          <input
            className="mx-2 my-1 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
            type="email"
            placeholder="Position"
            onChange={(e)=>setPosition(e.target.value)}
            value={position}/>


          <input
            className="mx-2 my-1 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
            type="email"
            placeholder="Company" 
            onChange={(e)=>setCompany(e.target.value)}
            value={company}/>

          <input
            className="mx-2 my-1 flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
            type="email"
            placeholder="Status" 
            onChange={(e)=>setStatus(e.target.value)}
            value={status}/>

          <button
            className="w-full ml-1 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            onClick={createJob}>
            Add Job
          </button>
        </div>
      </div>


      {/* Table */}
      <section className="container px-4 mx-auto py-4 w-[90vw]">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-indigo-600">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-extrabold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Company</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-extrabold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Position
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-extrabold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-extrabold text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Date
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-indigo-950">
                    {jobs.map((job) => (
                      <tr key={job._id}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">

                            <div className="">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {job.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {job.position}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">

                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {job.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {job.createdAt}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-gray-500 dark:text-gray-300 hover:text-indigo-600"
                            onClick={()=>deleteJob(job._id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
      ):


      // Not Loggedin User
      <div>
        <div class="border-l-4 border-red-500 p-4 rounded-md bg-red-100">
  <div class="flex items-center space-x-4">
    <div class="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
        class="h-6 w-6 text-red-600">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path>
      </svg>
    </div>
    <div class="">
      <p class="text-sm font-medium text-red-600">
        You are not logged in, Please log in!
      </p>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
        class="h-6 w-6 text-red-600 cursor-pointer">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </div>
    <button
    class="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
    <Link to='/login'>Log In</Link>
  </button>
  </div>
</div>
        </div>}




    </div>
  )
}

export default Home