const Post = require('../models/posts')
const User = require('../models/users')

//--------------------------------------- Create user conditions


//General requests

exports.getAllPosts= async (req,res) => {           // Method for getting the list of All Posts
    


    try{
        const all_Post = await Post.find()

        res.status(200).json({
            status:'success',
            results:all_Post.length,
            data:{
                all_Post
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err
        })
    }
}

exports.applyPost = async (req, res) => {                 //Method for updating the user info
    

    const {_id} = req.body
    const myUser = await User.findById({_id})
    const myPost = await Post.findById(req.params.id)
    const employer= await User.findById(myPost.company)
    
    const alreadyApplied = await Post.find({_id:req.params.id},{candidates:{        //CHECKS IF ALREADY APPLIED FOR JOB
            $elemMatch: {
                id: myUser.id
            }
        }
    })
    

    if(alreadyApplied[0].candidates.length!=0)              //DOES THE LOGICAL COMPARISON FOR THE ARRAY OF FOUND CANDIDATES
    {
        return res.status(404).json({
            results:"You have already applied for this position",
            status: 'Failed',
            data:alreadyApplied,
            candid:alreadyApplied[0].candidates
        })
    }


    const candidate ={
        id:myUser.id,
        name:myUser.name,
        lastname:myUser.lastname,
        contact_info:{
            phone:myUser.phone,
            email:myUser.email
        },
        CV:myUser.CV
    }

    const mystatus_employer ={
        id:myPost.id,
        userId:myUser.id,
        name:myUser.name+" "+myUser.lastname,
        status: "pending"
    }

    const mystatus_jobseeker ={
        id:myPost.id,
        name:employer.company,
        status: "applied",
    }

    
    

    try{
        const updateUser = await User.findByIdAndUpdate(req.body._id,            //UPDATES THE APPLIED USER ARRAY
            {
                $push:{applied:mystatus_jobseeker}
            })
        const updateEmployer = await User.findByIdAndUpdate(myPost.company,     //UPDATES THE CANDIDATES POST ARRAY
            {
            $push:{applied:mystatus_employer}
            })

        const updatePost = await Post.findByIdAndUpdate(req.params.id,          //UPDATES THE APPLIED EMPLOYER ARRAY
            {
             $push:{candidates: candidate}
            })

    
        res.status(200).json({
            status: 'success'
        })

    }catch(err){
        res.status(407).json({
            status:'fail',
            message: err
        })
    }
}


exports.deleteAllPosts = async (req, res) => {              // Method for deleting all posts (Admin Only)
    try{

        const byeBye = await Post.deleteMany({})

        res.status(200).json({
            status:'success',
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err,
        })
    }


}


//--------------------------------------- ID all posts

exports.getIDPosts= async (req,res) => {           // Method for getting the list of my Posts
    const {company} = req.body
    const all_Post = await Post.find({company})
    try{
        
        res.status(200).json({
            status:'success',
            results:all_Post.length,
            data:{
                all_Post
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err
        })
    }
}

exports.createPost = async (req, res) =>{          // Method for creating a new Post
    
    const mynewPost=req.body
    const mysize=(await Post.collection.stats()).size.toString()
    mynewPost._id=mynewPost.title+"-"+mysize
    mynewPost.company = req.body.company;
    try{
        const newPost = await Post.create(mynewPost)    
        

        res.status(200).json({
            status:'success',
            value:newPost
        })
    }catch(err){
        res.status(400).json({
            status:'failed to create',
            message: err,
            value:req.body,
            warning:'try again'
        })
    }
}


// --------------------------------------ID only Post

exports.getMyPost= async (req,res) => {               //Method to get specific Post
    try{
        const myPost = await Post.findById(req.params.id)

        if(!myPost)
        {
            return res.status(404).json({
                results:"Post not found",
                status: 'Failed',
            })
        }

        res.status(200).json({
            status: 'success',
            results:req.params._id,
            data:{
                myPost
            }
        })
    }catch(err){
        res.status(406).json({
            status:'fail',
            message: err
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Remove from users' list of applied jobs
      await User.updateMany(
        { applied: postId },
        { $pull: { applied: postId } }
      );
  
      // Remove from users' list of interviews
      await User.updateMany(
        { interviews: postId },
        { $pull: { interviews: postId } }
      );
  
      const myPost = await Post.findByIdAndDelete(postId);
  
      res.status(204).json({
        status: 'success element deleted',
        data: myPost,
      });
    } catch (err) {
      res.status(407).json({
        status: 'fail',
        message: err,
      });
    }
  };
  
  
exports.updatePost = async (req, res) => {                 //Method for updating the Post info
    try{
        
        const removeCandidatesfromUsers=await User.updateMany({applied:{     //remove from users list of applied jobs
            $elemMatch: {
                id:req.params.id
            }
        }},{ $pull:{
            applied:{id:req.params.id}
        }})

        const modify= req.body
        modify.candidates=[]
        const myPost = await Post.findByIdAndUpdate(req.params.id,modify)
        myPost.candidates=[]

        res.status(200).json({
            status: 'success',
            data:{
                myPost
            }
        })

    }catch(err){
        res.status(407).json({
            status:'fail',
            message: err
        })
    }
}

exports.applyToPost = async (req, res) => {
    const { userId, postId } = req.body;
  
    try {
      // Add postId to the applied array in the User model
      await User.findByIdAndUpdate(userId, { $addToSet: { applied: postId } });
  
      // Add userId to the candidates array in the Post model
      await Post.findByIdAndUpdate(postId, { $addToSet: { candidates: userId } });
  
      res.status(200).json({
        status: "success",
        message: "Successfully applied to the post",
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
  };

  exports.getPostsByCompany = async (req, res) => {
    try {
      const companyId = req.params.companyId;
      const posts = await Post.find({ company: companyId });
  
      res.status(200).json({
        status: "success",
        data: {
          posts,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "failed to fetch posts",
        message: err,
      });
    }
  };
  
  exports.getCandidatesByPostId = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          status: 'failed',
          message: 'Post not found',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          candidates: post.candidates,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err,
      });
    }
  };

  exports.addSelectedCandidate = async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.postId,
        {
          $addToSet: { selectedCandidates: req.params.userId },
          $pull: { candidates: req.params.userId },
        },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: 'success',
        data: {
          post,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  };
  
  
  // In your controllers file (e.g., postController.js)
  exports.getSelectedCandidates = async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId).select('selectedCandidates');
      if (!post) {
        return res.status(404).json({
          status: 'fail',
          message: 'Post not found',
        });
      }
  
      const selectedCandidateObjects = await User.find({
        _id: { $in: post.selectedCandidates },
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          selectedCandidates: selectedCandidateObjects,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  };