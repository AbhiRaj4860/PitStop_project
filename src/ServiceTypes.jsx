import { useParams, useNavigate } from "react-router-dom";

function ServiceTypes() {
  const { mainService } = useParams();
  const navigate = useNavigate();

  const services = ["Oil Change", "General Service", "Specific Problems", "AC Service"];

  const handleServiceClick = (service) => {
    // Navigate to ServiceDetails with both main service and sub-service type if needed
    navigate(`/service-details/${service}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Choose a Service Type for: {mainService}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {services.map((service, index) => (
          <li
            key={index}
            onClick={() => handleServiceClick(service)}
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px",
              borderRadius: "5px",
              background: "#f9f9f9",
              transition: "0.3s"
            }}
            onMouseEnter={(e) => (e.target.style.background = "#e0e0e0")}
            onMouseLeave={(e) => (e.target.style.background = "#f9f9f9")}
          >
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceTypes;
