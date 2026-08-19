import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Stack
} from "@mui/material";

function EmployeeForm({
  form,
  setForm,
  editId,
  saveEmployee,
  updateEmployee,
  clearForm
}) {
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>

        <Grid container spacing={2}>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Department"
              value={form.department}
              onChange={(e) =>
                setForm({
                  ...form,
                  department: e.target.value
                })
              }
            />
          </Grid>
          <TextField
            fullWidth
            type="date"
            label="Joining Date"
            InputLabelProps={{
              shrink: true
            }}
            value={form.joiningDate}
            onChange={(e) =>
              setForm({
                ...form,
                joiningDate:
                  e.target.value
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Designation"
            value={form.designation}
            onChange={(e) =>
              setForm({
                ...form,
                designation:
                  e.target.value
              })
            }
            sx={{ mb: 2 }}
          />

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Salary"
              value={form.salary}
              onChange={(e) =>
                setForm({
                  ...form,
                  salary: e.target.value
                })
              }
            />
          </Grid>

        </Grid>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>

          {editId ? (
            <Button
              variant="contained"
              color="success"
              onClick={updateEmployee}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={saveEmployee}
            >
              Save
            </Button>
          )}

          <Button
            variant="outlined"
            color="secondary"
            onClick={clearForm}
          >
            Clear
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}

export default EmployeeForm;