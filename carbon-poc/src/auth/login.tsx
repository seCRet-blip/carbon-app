import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type LoginProps = {
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
  errorMessage?: string;
};

const LogIn = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Please enter an email'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter your password'),
});

export function Login({ onLogin, onSwitchToSignup, errorMessage }: LoginProps) {
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
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: ''}}
          validationSchema={LogIn}
          onSubmit={async (values, { setSubmitting }) => {
            await onLogin(values.email, values.password)
            setSubmitting(false);
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
              <ErrorMessage name='email'
                render={(msg) => (
                  <Typography variant='body2' color='error' sx={{ mt: 1}}>
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
                  />
                )}
              </Field>
              <ErrorMessage name='password'
                render={(msg) => (
                  <Typography variant='body2' color='error' sx={{ mt: 1}}>
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
                Login
              </Button>
              {errorMessage && (
                <Typography variant='body2' color='error' sx={{ mt: 1}}>
                  {errorMessage}
                </Typography>
              )}
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={onSwitchToSignup}
                  sx={{ cursor: 'pointer' }}
                >
                  Sign up
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}