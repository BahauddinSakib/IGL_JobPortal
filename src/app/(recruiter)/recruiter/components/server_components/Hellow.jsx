"use client"; // Next.js 13+ app router

import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import { Card, Row, Col, Table, Button, Spinner, Form } from "react-bootstrap";
import { FaBriefcase, FaUser, FaUserCheck, FaUserTie } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("2025-11"); // default month

  // Fetch data (can later pass month param to API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/dashboard", { params: { month } }); // future month param
        setData(res.data);
      } catch (error) {
        console.log("⚠️ No API found, using manual data...");
        // fallback manual data
        setData({
          activeJobs: 500,
          candidates: 230,
          selected: 42,
          hires: 22,
          topJobs: [
            { title: "Software Engineer", department: "IT & Development", applicants: 120, views: 800, status: "Open" },
            { title: "Marketing Manager", department: "Marketing", applicants: 85, views: 750, status: "Open" },
            { title: "Sales Executive", department: "Sales", applicants: 65, views: 650, status: "Closed" },
          ],
          candidatesList: [
            { name: "Davina Carter", role: "Software Engineer", status: "Scheduled" },
            { name: "Sophia Martinez", role: "Marketing Manager", status: "Completed" },
            { name: "Zoe Brown", role: "Data Scientist", status: "Scheduled" },
          ],
          monthlyStats: {
            // data for charts (dummy)
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            activeJobs: [120, 130, 140, 110],
            candidates: [50, 60, 55, 65],
            selected: [10, 12, 8, 12],
            hires: [5, 6, 4, 7],
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading dashboard...</p>
      </div>
    );

  // Pie chart temporary data
  const pieData = {
    labels: ["Active Jobs", "Candidates", "Selected", "Hires"],
    datasets: [
      {
        label: "Dashboard Stats",
        data: [data.activeJobs, data.candidates, data.selected, data.hires],
        backgroundColor: ["#0d6efd", "#198754", "#ffc107", "#dc3545"],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart temporary data (monthly)
  const barData = {
    labels: data.monthlyStats.labels,
    datasets: [
      {
        label: "Active Jobs",
        data: data.monthlyStats.activeJobs,
        backgroundColor: "#0d6efd",
      },
      {
        label: "Candidates",
        data: data.monthlyStats.candidates,
        backgroundColor: "#198754",
      },
      {
        label: "Selected",
        data: data.monthlyStats.selected,
        backgroundColor: "#ffc107",
      },
      {
        label: "Hires",
        data: data.monthlyStats.hires,
        backgroundColor: "#dc3545",
      },
    ],
  };

  const summaryCards = [
    { label: "Active Jobs", value: data.activeJobs, color: "primary", icon: <FaBriefcase size={28} /> },
    { label: "Candidates", value: data.candidates, color: "success", icon: <FaUser size={28} /> },
    { label: "Selected", value: data.selected, color: "warning", icon: <FaUserCheck size={28} /> },
    { label: "Hires", value: data.hires, color: "danger", icon: <FaUserTie size={28} /> },
  ];

  return (
    <div className="container py-4">
      {/* Header */}
      <h2
        className="fw-bold mb-4 text-white"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          fontSize: "1.5rem",
          textAlign: "left",
          padding: "1rem",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        JOB RECRUITMENT & CAREER PORTAL DASHBOARD
      </h2>

      {/* --- Summary Cards --- */}
      <Row className="g-3 mb-4">
        {summaryCards.map((item, i) => (
          <Col md={3} key={i}>
            <Card className="text-center shadow-sm border-0">
              <Card.Body>
                <div className="mb-2">{item.icon}</div>
                <h2 className={`fw-bold text-${item.color}`}>
                  <CountUp end={item.value} duration={1.5} />
                </h2>
                <p className="text-muted mb-0">{item.label}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- Month Selector --- */}
      <Form.Group className="mb-4" controlId="monthSelect">
        <Form.Label>Select Month</Form.Label>
        <Form.Select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="2025-11">November 2025</option>
          <option value="2025-10">October 2025</option>
          <option value="2025-09">September 2025</option>
        </Form.Select>
      </Form.Group>

      {/* --- Charts Section --- */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Dashboard Overview (Pie)</Card.Title>
              <div className="d-flex justify-content-center">
                <div style={{ width: 300 }}>
                  <Pie data={pieData} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>Monthly Performance (Bar)</Card.Title>
              <div className="d-flex justify-content-center">
                <div style={{ width: "100%" }}>
                  <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* --- Top Performing Job Listings --- */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Card.Title>Top Performing Job Listings</Card.Title>
          <Table hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Department</th>
                <th>Applicants</th>
                <th>Views</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.topJobs.map((job, i) => (
                <tr key={i}>
                  <td>{job.title}</td>
                  <td>{job.department}</td>
                  <td>{job.applicants}</td>
                  <td>{job.views}</td>
                  <td>
                    <span className={`badge ${job.status === "Open" ? "bg-success" : "bg-danger"}`}>{job.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* --- Interview Candidates --- */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title>Interview Candidates</Card.Title>
          <div className="mt-3">
            {data.candidatesList.map((c, i) => (
              <div className="d-flex justify-content-between align-items-center mb-3" key={i}>
                <div>
                  <strong>{c.name}</strong> <br />
                  <small className="text-muted">{c.role}</small>
                </div>
                <Button variant={c.status === "Completed" ? "outline-success" : "primary"} size="sm">
                  {c.status === "Completed" ? "Review Note" : "View Details"}
                </Button>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
