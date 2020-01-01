var Campground  = require('../models/campground'),
    Comment     = require('../models/comment');
var router      = require('express').Router({mergeParams : true});

// COMMENT FORM 
router.get('/new',isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err) console.log(err);
        else
        {
            res.render("comments/new",{campground:campground});
        }
    });

});
/*  CREATING A COMMENT */
router.post('',isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err, campground)=>{
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        } 
        else
        {
            Comment.create(req.body.comment, (err,comment)=>{
                if(err) console.log(err);
                else{
                    // adding username and id to comment
                    comment.author.id       = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save(); 
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id)
                }
            });
        }
    });
});
function isLoggedIn(req,res,next) {  
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;