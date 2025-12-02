import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type SignupProps = {
  onSignup: (email: string, password: string) => void;
  onSwitchToLogin: () => void;
};

const SignUp = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter an email'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .required('Please enter a password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
});

export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Formik
          initialValues={{ email: '', password: ''}}
          validationSchema={SignUp}
          onSubmit={(values) => {
            onSignup(values.email, values.password)
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field name="email">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    type="email"
                    margin="normal"
                    required
                  />
                )}
              </Field>
              <ErrorMessage name="email"
                render={(msg) => (
                  <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                    {msg}
                  </Typography>
                )}
              />
              <Field name="password">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    required
                    helperText="Enter at least 8 characters with one uppercase letter"
                  />
                )}
              </Field>
              <ErrorMessage name="password"
                render={(msg) => (
                  <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                    {msg}
                  </Typography>
                )}
              />
              <Field name="confirmPassword">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    margin="normal"
                    required
                  />
                )}
              </Field>
              <ErrorMessage name="confirmPassword"
                render={(msg) => (
                  <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                    {msg}
                  </Typography>
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || !isValid}
              >
                Sign Up
              </Button>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={onSwitchToLogin}
                  sx={{ cursor: 'pointer' }}
                >
                  Login
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}