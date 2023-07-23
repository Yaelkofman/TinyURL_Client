

import React, { useState } from "react";
import axios from 'axios';
import './style.css'

export default function Buttons() {
    const [showSignInInputs, setShowSignInInputs] = useState(false);
    const [signInFormData, setSignInFormData] = useState({ email: "", password: "", name: "" });
    const [showLoginInputs, setShowLoginInputs] = useState(false);
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "", name: "" });
    const [platform, setplatform] = useState({ value: "", newUrl: "", name: "", origionalUrl: "" });
    const [shortLink, setShortLink] = useState({ newUrl: "", origionalUrl: "" });
    const [linkToDelete, setlinkToDelete] = useState({ newUrl: "", origionalUrl: "" });
    const [linkToUpdate, setlinkToUpdate] = useState({ newUrl: "", updateUrl: "" });
    const [showButtons, setShowButtons] = useState(false);
    const [showButtonsShortLink, setShowButtonsShortLink] = useState(false);
    const [token, setToken] = useState("");
    const [showRedirect, setShowRedirect] = useState(false);
    const [showplatform, setshowplatform] = useState(false);
    const [showAddingUser, setshowAddingUser] = useState(false);
    const [showtodelete, setshowtodelete] = useState(false);
    const [showtoupdate, setshowtoupdate] = useState(false);

    const [redirectUrl, setRedirectUrl] = useState("");
    const [newUser, setnewUser] = useState({ email: "", password: "", name: "" })


    // const List = () => {
    //     const [links, setLinks] = useState([]);

    //   React.useEffect(() => {
    //         const fetchData = async () => {
    //             const response = await axios.get('http://localhost:8000/users/getLst');
    //             setLinks(response.data);
    //         };
    //         fetchData();
    //     }, []);

    function handleInputChange(event, formData, setFormData) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSignInClick() {
        setShowSignInInputs(true);
    }
    function handleAddingUserClick() {
        setshowAddingUser(true);
    }

    function handleShortLink() {
        setShowButtonsShortLink(true);
    }
    function handleUpdateLink() {
        setshowtoupdate(true);
    }

    function handleSignInSubmit() {
        axios.post('http://localhost:8000/signin', signInFormData)
            .then(response => {
                const token = response.data.token;
                console.log(token + "טוקןן");
                setToken(token);
                setShowButtons(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleLoginClick() {
        setShowLoginInputs(true);
    }
    //ליצור פונ UPDATE מריאקט
    function handleLoginSubmit() {
        axios.post('http://localhost:8000/login', loginFormData)
            .then(response => {
                const token = response.data.token;
                console.log(token + "טוקןן");
                setToken(token);
                setShowButtons(true);
            })
            .catch(error => {
                console.log(error);
            });
    }
    function updateLink() {
        axios.put('http://localhost:8000/links', linkToUpdate, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                console.log("the link is updated")
            })
            .catch(error => {
                console.log(error);
            });
    }

    function addLink() {
        console.log(shortLink + "  shortlink")
        axios.post('http://localhost:8000/links', shortLink, {
            headers: {
                //'Authorization': 'Bearer ' + token
                'Authorization': token

            }
        })
            .then(response => {

                const url = response.data; // the URL sent in the response
                console.log(url);
                prompt("the shorten link is: " + url)
            })
            .catch(error => {
                console.log(error);
            });
    }
    //הוספת פלטפורמה ללינק.נדרש בספרינט שלוש
    function addPlatform() {
        console.log(platform.name + "  " + platform.value)
        axios.post('http://localhost:8000/links/platform', platform, {
            headers: {
                'Authorization': token

            }
        })
            .then(response => {
                const url = response.data; // the URL sent in the response
                console.log(url);
                prompt("the shorten link is: " + url)
            })
            .catch(error => {
                console.log(error);
            });
    }

    function addUser() {
        //זה השדות שמוסיפים:
        //name, value, newUrl, origionalUrl 
        console.log(platform.name + "  " + platform.value)
        axios.post('http://localhost:8000/users', newUser, {
            headers: {
                'Authorization': token

            }
        })
            .then(response => {
                const ans = response.data;
                console.log(ans);

            })
            .catch(error => {
                console.log(error);
            });
    }
    //פונ שאמורה להביא את כל הלינקים של המשתמש הנוכחי. אשמח אם המורה תוכל להגיד לי למה לא

    // function getList() {
    //     axios.get('http://localhost:8000/users/getLst'  {

    //         headers: {
    //             //'Authorization': 'Bearer ' + token
    //             'Authorization': token

    //         }
    //     })
    //         .then(response => {
    //             //להציג כטבלה
    //             const ans = response.data; // the URL sent in the response
    //             console.log(ans);

    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }


    //ניסיתי לעשות פונ רידייקט שמפנה ישר לאתר אחר אבל זה לא נתן לי בדפדפן בגלל הרשאות חסומות של גוגל...אבל בפוסטמן זה עובד
    // function handleRedirectClick() {
    //     setShowRedirect(true);
    // }

    //function handleRedirectSubmit() {
    //     console.log(redirectUrl)
    //     axios.get(`http://localhost:8000/${redirectUrl}`, {

    //         headers: {
    //             'Authorization': token

    //         }
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    function handlePlatformClick() {
        setshowplatform(true)
    }
    function handleDeleteLink() {
        setshowtodelete(true)
    }



    function deleteLink() {
        console.log(token + "  token")
        const url = linkToDelete.newUrl
        axios.delete(`http://localhost:8000/links/${url}`, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                const ans = response.data;
                console.log(ans);

            })
            .catch(error => {
                console.log(error);
            });
    }

    //הכפתורים מוצגים לי רק במקרה ולחצתי על כפתור מסוים...
    return (
        <>
            <button className="button" onClick={handleSignInClick}>Sign In</button>
            <button className="button" onClick={handleLoginClick}>Log In</button>
            {showSignInInputs && (
                <div className="inputs-container">
                    <input className="input" name="email" value={signInFormData.email} onChange={(event) => handleInputChange(event, signInFormData, setSignInFormData)} />
                    <span className="input-label">Email</span>
                    <input className="input" name="password" value={signInFormData.password} onChange={(event) => handleInputChange(event, signInFormData, setSignInFormData)} />
                    <span className="input-label">Password</span>
                    <input className="input" name="name" value={signInFormData.name} onChange={(event) => handleInputChange(event, signInFormData, setSignInFormData)} />
                    <span className="input-label">Name</span>
                    <button className="submit-button" onClick={handleSignInSubmit}>Submit</button>
                </div>
            )}
            {showLoginInputs && (
                <div className="inputs-container">
                    <input className="input" name="email" value={loginFormData.email} onChange={(event) => handleInputChange(event, loginFormData, setLoginFormData)} />
                    <span className="input-label">Email</span>
                    <input className="input" name="password" value={loginFormData.password} onChange={(event) => handleInputChange(event, loginFormData, setLoginFormData)} />
                    <span className="input-label">Password</span>
                    <input className="i nput" name="name" value={loginFormData.name} onChange={(event) => handleInputChange(event, loginFormData, setLoginFormData)} />
                    <span className="input-label">Name</span>
                    <button className="submit-button" onClick={handleLoginSubmit}>Submit</button>
                </div>
            )}
            {showButtons && (
                <>
                    <button className="button" onClick={handleAddingUserClick}>Add User</button>
                    <button className="button" onClick={handlePlatformClick}>Add platform</button>
                    {/* <button className="button" onClick={handleRedirectClick}>Redirect</button> */}
                    <button className="button" onClick={handleShortLink}>Shorten Link</button>
                    <button className="button" onClick={handleDeleteLink}>deleteLink</button>
                    <button className="button" onClick={handleUpdateLink}>update link</button>

                </>
            )}
            {showButtonsShortLink && (
                <div className="inputs-container">
                    <input className="input" name="origionalUrl" value={shortLink.origionalUrl} onChange={(event) => setShortLink({ ...shortLink, origionalUrl: event.target.value })} />
                    <span className="input-label">Original URL</span>
                    <input className="input" name="newUrl" value={shortLink.newUrl} onChange={(event) => setShortLink({ ...shortLink, newUrl: event.target.value })} />
                    <span className="input-label">New URL</span>

                    <button className="submit-button" onClick={addLink}>Submit</button>
                </div>
            )}
            {showtoupdate && (
                <div className="inputs-container">
                    <input className="input" name="origionalUrl" value={linkToUpdate.newUrl} onChange={(event) => setlinkToUpdate({ ...linkToUpdate, newUrl: event.target.value })} />
                    <span className="input-label">origional short URL</span>
                    <input className="input" name="newUrl" value={linkToUpdate.updateUrl} onChange={(event) => setlinkToUpdate({ ...linkToUpdate, updateUrl: event.target.value })} />
                    <span className="input-label">New short URL</span>
                    <button className="submit-button" onClick={updateLink}>Submit</button>
                </div>
            )}
            {showtodelete && (
                <div className="inputs-container">
                    {/* <input className="input" name="origionalUrl" value={linkToDelete.origionalUrl} onChange={(event) => setlinkToDelete({ ...linkToDelete, origionalUrl: event.target.value })} />
                    <span className="input-label">Original URL</span> */}
                    <input className="input" name="newUrl" value={linkToDelete.newUrl} onChange={(event) => setlinkToDelete({ ...linkToDelete, newUrl: event.target.value })} />
                    <span className="input-label">New URL</span>
                    <button className="submit-button" onClick={deleteLink}>Submit</button>
                </div>
            )}
            <br />
            {/* {showRedirect && (
                <div className="inputs-container">
                    <input className="input" name="redirectUrl" value={redirectUrl} onChange={(event) => setRedirectUrl(event.target.value)} />
                    <span className="input-label">Redirect URL</span>
                    <button className="submit-button" onClick={handleRedirectSubmit}>Submit</button>
                </div>
            )} */}


            {showplatform && (
                <div className="inputs-container">
                    <input className="input" name="addplatform" value={platform.name} onChange={(event) => setplatform({ ...platform, name: event.target.value })} />
                    <span className="input-label">Social Network name</span>
                    <input className="input" name="addplatform" value={platform.newUrl} onChange={(event) => setplatform({ ...platform, newUrl: event.target.value })} />
                    <span className="input-label">new url</span>
                    <input className="input" name="addplatform" value={platform.origionalUrl} onChange={(event) => setplatform({ ...platform, origionalUrl: event.target.value })} />
                    <span className="input-label">origionalUrl</span>
                    <input className="input" name="addplatform" value={platform.value} onChange={(event) => setplatform({ ...platform, value: event.target.value })} /><br />
                    <span className="input-label">value</span>
                    <button className="submit-button" onClick={addPlatform}>Submit</button>
                </div>
            )}

            {showAddingUser && (
                <div className="inputs-container">
                    <input className="input" name="email" value={newUser.email} onChange={(event) => handleInputChange(event, newUser, setnewUser)} />
                    <span className="input-label">Email</span>
                    <input className="input" name="password" value={newUser.password} onChange={(event) => handleInputChange(event, newUser, setnewUser)} />
                    <span className="input-label">Password</span>
                    <input className="i nput" name="name" value={newUser.name} onChange={(event) => handleInputChange(event, newUser, setnewUser)} />
                    <span className="input-label">Name</span>
                    <button className="submit-button" onClick={addUser}>add user</button>
                </div>
            )}

            {/* הרשימה של הלינקים לכל משתמש : */}
            {/* <div>
                    <h1>List of Links</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Original URL</th>
                                <th>New URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map(link => (
                                <tr key={link.newUrl}>
                                    <td>{link.originalUrl}</td>
                                    <td>{link.newUrl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
        </>
    );
}
