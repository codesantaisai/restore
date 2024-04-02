import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material"
import agent from "../../app/api/agent"
import { useState } from "react"

const AboutPage = () => {
  const [validationError,setValidationError] = useState<string[]>([]);
console.log("validationError"
);

  function getValidationError(){
    agent.TestErrors.getValidationError()
    .then(()=>console.log("Should not see this"))
    .catch(error=>setValidationError(error))
  }
  return (
    <Container>
      <Typography gutterBottom variant="h2">Errors for testing purpose</Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={()=>agent.TestErrors.get400Error().catch(error=>console.log(error))}>Test 400 Error</Button>
        <Button variant="contained" onClick={()=>agent.TestErrors.get401Error().catch(error=>console.log(error))}>Test 401 Error</Button>
        <Button variant="contained" onClick={()=>agent.TestErrors.get404Error().catch(error=>console.log(error))}>Test 404 Error</Button>
        <Button variant="contained" onClick={()=>agent.TestErrors.get500Error().catch(error=>console.log(error))}>Test 500 Error</Button>
        <Button variant="contained" onClick={getValidationError}>Test Get Validation Error</Button>
      </ButtonGroup>
      {validationError.length > 0 &&
      <Alert severity="error">
        <AlertTitle>Validation Error</AlertTitle>
        <List>
          {validationError.map((error)=>(
            <ListItem key={error}>
              <ListItemText>{error}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Alert> }

    </Container>
  )
}

export default AboutPage