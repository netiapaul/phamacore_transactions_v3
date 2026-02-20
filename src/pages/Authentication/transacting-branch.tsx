import { Alert, Button, Col, Container, Label, Row, Spinner } from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import React, { useState } from "react";
import { ValidateBranch } from "../../services/auth";
import logoLight from "../../assets/images/phamacore.webp";
import { useNavigate } from "react-router-dom";

export default function TransactingBranch() {
  const navigate = useNavigate();
  const [option, setOption] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = JSON.parse(localStorage.getItem("authUser") || "");
  const userBranches = user["userBranches"] || [];

  const handleBranchChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const val = e.target.value;
    if (val === "") {
      setOption(null);
      return;
    }
    // option value is the branch code (bcode) — find the matching object
    const selected = userBranches.find(
      (b: any) => String(b?.bcode) === String(val),
    );
    setOption(selected || null);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const run = async () => {
      setError(null);
      if (!option) {
        setError("Please select a branch before proceeding.");
        return;
      }

      const bcode = Number(option?.bcode);
      if (Number.isNaN(bcode)) {
        setError("Selected branch does not include a valid branch code.");
        return;
      }

      try {
        setLoading(true);
        const initResult = await ValidateBranch({ bcode });

        // persist selected branch and init data
        try {
          localStorage.setItem("activeBranch", JSON.stringify(option));
          console.log(initResult);
        } catch (_) {
          // ignore localStorage errors
        }
        navigate("/sales-analysis/sales-dasboard", { replace: true });
      } catch (err: any) {
        setError(
          err?.toString() ?? "An error occurred during branch validation.",
        );
      } finally {
        setLoading(false);
      }
    };

    void run();
  };

  const handleLogout = () => {
    navigate("/logout", { replace: true });
  };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <span className="d-inline-block auth-logo">
                    <img src={logoLight} alt="" height="40" />
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card mt-4 z-1">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p className="text-muted">
                      Please select a transacting branch.
                    </p>
                  </div>
                  {error && <Alert color="danger"> {error} </Alert>}
                  <div className="p-2 mt-4">
                    <form autoComplete="off" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <Label htmlFor="username" className="form-label">
                          Assigned Branches
                        </Label>
                        <select
                          className="form-select"
                          required
                          onChange={handleBranchChange}
                        >
                          <option value="">Select a branch</option>
                          {userBranches.map((item: any, index: number) => (
                            <option value={item?.bcode} key={index}>
                              {item?.brancH_NAME}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="d-flex mt-4 gap-2">
                        <Button
                          color="success"
                          disabled={loading}
                          className="btn btn-success w-100"
                          type="submit"
                        >
                          {loading && (
                            <Spinner size="sm" className="me-2">
                              Loading...{" "}
                            </Spinner>
                          )}
                          {loading ? "Please wait..." : "Proceed"}
                        </Button>
                        <Button
                          color="danger"
                          outline
                          disabled={loading}
                          className="btn w-100"
                          type="button"
                          onClick={handleLogout}
                        >
                          {false && (
                            <Spinner size="sm" className="me-2">
                              Loading...{" "}
                            </Spinner>
                          )}
                          Logout
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <div
            style={{
              width: 420,
              padding: 20,
              borderRadius: 8,
              background: "#fff",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ margin: 0, marginBottom: 12 }}>Transacting Branch</h3>

            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter value"
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                }}
              />

              <select
                value={option}
                onChange={(e) => setOption(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                }}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
        </div> */}
      </ParticlesAuth>
    </React.Fragment>
  );
}
