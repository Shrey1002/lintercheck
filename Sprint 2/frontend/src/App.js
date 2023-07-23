import './css_files/App.css';

import SignUp from './components/pages/SignUp';


function App () {


  return (

   
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element= {<Home/>} />
                <Route path="/profile" element= { <Profile />} />
                <Route path="/editprofile" element ={<EditProfile/>} />
                <Route path="/signup" element ={<SignUp/>} />
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/postJob" element={<Post/>} />
                <Route path="/exp_jobs" element={<Explore_Jobs/>}/>
                <Route path="/post/:postId" element={<Individual_Post/>}/>
                <Route path="/companyposts/:company" element={<ManagePosts/>}/>
                <Route path="/postdetails/:postId" element={<PostDetails/>} />
                <Route path="/interviews" element={<Interviews/>}/>
                <Route path="/applications" element={<AllApplications/>}/>
            </Routes>
            </BrowserRouter>
       
    );
}

export default App;
