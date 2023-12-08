import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import AuthContext from "../context/AuthContext";
// import ToastContext from "../context/ToastContext";



const Home = () => {
//   const { toast } = useContext(ToastContext);
//   const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();

   const searchStatements = async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      console.log('xx', result);

      if (!result.error) {
        // toast.success("user registered successfully! login into your account!");
        navigate("/statements", { state: { data: result, name: userData.name} });
        console.log(result);
      } else {
        // toast.error(result.error);
      }
    } catch (err) {
      console.log(err.message);
    }
  };


  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !credentials.email ||
      !credentials.startDate ||
      !credentials.endDate
    ) {
    //   toast.error("please enter all the required fields!");
      return;
    }
    
    const startDateObj = new Date(credentials.startDate);
    const endDateObj = new Date(credentials.endDate);

    // Check if the start date is smaller than the end date
    if(startDateObj > endDateObj) {
        console.log("wrong");
        return;
    }

    searchStatements(credentials);
  };

  return (
    <div className='container mt-4'>
      <h3>Enter your details</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label mt-2">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label mt-4">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={credentials.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label  className="form-label mt-4">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={credentials.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Search"
          className="btn btn-primary my-3 px-5"
        />
      </form>
    </div>
  );
};

export default Home;