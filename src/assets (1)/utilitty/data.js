export const userQuery = (email)=>{const query=`*[_type=="user" && email =="${email}"]{
    username,
    _id,
    profilepicture,
    pinsave[]{
      _id,
      _key,
    image {
      asset-> {
        url
      }
    },
      userid,
      destination,
      category,
      title,
      about,
      postedby ->{
          _id,
          username
      },
      save[]{
          _key,
          postedby ->{
              _id,
              username,
              profilepicture
          },
         
      },
    }
}`
return query};

export const searchQuery = (searchTerm)=>{ const query=`*[_type =="pin" && title match "${searchTerm}*" || category match "${searchTerm}*"  || about match "${searchTerm}*"]
{
    image {
        asset-> {

            url
        }
      },
        userid,
        _id,
        destination,
        postedby ->{
            username
        },
        save[]{
            _key,
            postedBy ->{
                _id,
                username
            },
           
        },
        imageasset,
}`
return query}


export const feedQuery =`*[_type=="pin"] | order(_createAt desc)
{
    image {
        asset-> {
            url
        }
      },
        userid,
        _id,
        destination,
        category,
        title,
        about,
        postedby ->{
            _id,
            username
        },
        save[]{
            _key,
            postedby ->{
                _id,
                username,
                profilepicture
            }, 
        },
        imageasset,
}`;

export const savedfeedQuery = (pinId)=>{
  const query=`*[_type == "user" && _id == '${pinId}']
  {
    pinsave[]{
        _key,
      image {
        asset-> {
          url
        }
      },
        userid,
        destination,
        category,
        title,
        about,
        postedby ->{
            _id,
            username
        },
        save[]{
            _key,
            postedby ->{
                _id,
                username,
                profilepicture
            },
           
        },}
}`
  return query;
};


export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
       
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedby->{
      _id,
      username,
      profilepicture
    },
   save[]{
      postedby->{
        _id,
        username,
        profilepicture
      },
    },
    comment[]{
      comment,
      _key,
      postedby->{
        _id,
        username,
        profilepicture
      },
    }
  }`;
  return query;
};

export const pinDetailsMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedby->{
      _id,
        username,
    },
    save[]{
      _key,
      postedby->{
        _id,
        username,
      },
    },
  }`;
  return query;
};

export const userDetails =(UserId)=>{
  const query = `*[_type == "user" && _id == "${UserId}"]{
    username,
    _id,
    profilepicture,
    email,
    firstname,
    gender,
    othername,
    bio,
    pinsave[]{
      _id,
      _key,
    image {
      asset-> {
        url
      }
    },
    }
  }`
  return query;
}
export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userid ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedby->{
      _id,
      username,
     profilepicture
    },
    save[]{
      postedby->{
        _id,
        username,
        profilepicture
      },
    },
  }`;
  return query;
};