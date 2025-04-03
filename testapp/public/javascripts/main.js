

const form = document.getElementById("add-post");
const authorField = document.getElementById("author-field");
const dateField = document.getElementById("date-field");
const contentField = document.getElementById("content-field");
const error = document.getElementById("errorMessage");
const postArea = document.getElementById("posts");
const colourField = document.getElementById("pfpColour");
const postFormatPattern = /^[A-Za-z0-9 .,!?()%&£'$'"]+$/ // keeping the regex as a variable allows us to use the .test func
nameReverse = false;
numReverse = false;
likeReverse = false;




// You can put these into a list directly like so: 
/*
const = [
  {
    ID: 0, 
    ... 
  }, 
  {
    Id: 1, 
    ...
  }
]

I'm not currently doing this because i am inserting the same posts multiple times, so its easier to just set them like i have below
*/

const posts = [
  {
    ID: 1,
    author: "TestUser1",
    date: "01/10/2019",
    content:
      "test",
    likes: 11
  },

  {
    ID: 2,
    author: "TestUser2",
    date: "01/10/2019",
    content:
      "test",
    likes: 11
  },

  {
    ID: 3,
    author: "TestUser3",
    date: "01/10/2019",
    content:
      "test",
    likes: 11
  },

  {
    ID: 4,
    author: "TestUser4",
    date: "01/10/2019",
    content:
      "test",
    likes: 11
  }
  



]
const examplePost = {
  ID: 0,
  author: "bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  date: "01/10/2019",
  content:
    "Today I started using FriendFace! It's the best social media site I've ever usedn AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.",
  likes: 11
};

const examplePost2 = {
  ID: 1,
  author: "a",
  date: "01/10/2020",
  content:
    "Today I started using FriendFace! It's the best social media site I've ever used.",
  likes: 9
};

const examplePost3 = {
  ID: 2,
  author: "c",
  date: "01/10/2018",
  content:
    "Today I started using FriendFace! It's the best social media site I've ever used.",
  likes: 1
};



IDCount = posts.length;

form.onsubmit = function(event) {

  /*

  Then that means you can just pass it as one object in create post 
  and helps add context to what these variables are 

  */

  const postInfo = {
    ID: IDCount,
    profilePictureColour : colourField.value,
    author : authorField.value,
    content : contentField.value,
    date : dateField.value,
    likes : 0
  }
  const ID = IDCount;
  IDCount++;

  // I would extract this regex variable at the top of the page since it'll always be the same for every post 
  // Makes it easier to go back and find and change and you code can be liek 
  //  regex = POST_REGEX_INPUT
  // I'd also rename it as regex on it's own isn't descriptive of what the variable does
  //  Something like post format would be better 
  



  if (!postFormatPattern.test(authorField.value)) 
    {
      alert("Author contains special characters!")
      return false;
    }

  if (!postFormatPattern.test(contentField.value))
    {
      alert ("Content contains special characters")
      return false;
    }
  

  createPost(postInfo);
  reloadPostList(reverse = false);

  authorField.value = "";
  contentField.value = "";
  dateField.value = "";

  event.preventDefault();
};

//  I'd rename these methods  to sortByDate, etc. since that's what it's doing, rather than sorting a list of dates. 
sortByDate = function(){
  numReverse = !numReverse;
  nameReverse = false;
  likeReverse = false;
  posts.sort((a,b) => new Date(a.date) - new Date(b.date));

  if (numReverse){
    posts.reverse();
  }

  reloadPostList();
  
}

sortByName = function(){

  nameReverse = !nameReverse;
  numReverse = false;
  likeReverse = false;
  posts.sort(function(a,b){
    let x = a.author.toLowerCase();
    let y = b.author.toLowerCase();
    if (x<y) {return -1;}
    if (x>y) {return 1;}
    return 0;
  });

  if (nameReverse)
    {
      posts.reverse();
    }
    reloadPostList();
}



sortByLikes = function(){
  likeReverse = !likeReverse;
  numReverse = false;
  nameReverse = false;

  posts.sort((a,b) => a.likes - b.likes);

  if (likeReverse){
    posts.reverse();
  }

  reloadPostList();
}

// I like that you extracted these to seperate methods, it makes the code a lot more self documenting 

reloadPostList = function() {
  postArea.innerHTML = "";
  
  posts.forEach(post => (postArea.innerHTML += formatPost(post)));
 
};

createPost = function(post) {
  posts.push(post);
};

addLike = function(postID){
  posts.find(post => post.ID === postID).likes ++
  reloadPostList()
}

deletePost = function(postID){
  delete posts[postID-1]; //-1 to get the index by 0 value
  reloadPostList();
  console.log(postID);

}
formatPost = function(post) {
  return `
    <div id = ${post.ID} class="post">
    
    <div class="author">  <div class = "pfp" style= "background-color: ${post.pfpColour};"> <img src = "http://localhost:3000/images/Silhouette.png" style = "width:30px;height:30px;"></div>>   ${post.author} on ${post.date} said:  </div> 
    
    <div class="content" > ${post.content}  </div>

    <div class ="content">  ${post.likes}  <button onclick="addLike((${post.ID}))"> Like</button> 

    <div class="content"> <button onclick="deletePost(${post.ID})"> delete </button>
    
    
    </div>
  `;
};
reloadPostList();

