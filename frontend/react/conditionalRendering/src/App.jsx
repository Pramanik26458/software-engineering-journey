import Nav from "./components/Navbar.jsx";
import Man from "./components/Man.jsx";
import Women from "./components/Women.jsx";
import Button from "./components/Button.jsx";

const App = () => {


  /* object data for rendering  */
  const user1 = {
    name: "Ram",
    age: 21,
    gender: "male",
  };

  const user2 = {
    name: "Sita",
    age: 18,
    gender: "female",
  };

  const user3 = {
    name: "Golu",
    age: 8,
    gender: "male",
  };



  /* function call */

  const abc=()=>{
    console.log('hello')
  }
  abc()





  return (
    <div>

      {/* ===== nav bar ====== */}
      <Nav
        title="Ashok"
        color="red"
        links={["Home", "about", "Account", "Contact"]}
      />
      <Nav
        title="Basak"
        color="blue"
        links={["Home", "Services", "Cources", "Contact", "Instructor"]}
      />


      {/* =======Conditional Rendering======== */}
      <h1 className="text-red-500 text-3xl mb-5">Conditional Rendering</h1>

      {user1.gender=='male'? <Man /> :<Women />}
      
      {/* for  child */}
      {user3.gender=='male'?(user3.age>10?<Man />:<Women />) :<Women />}

      <Button />
    </div>
  );
};

export default App;
