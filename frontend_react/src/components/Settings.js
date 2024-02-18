import React from 'react';
import { Slider, Tooltip, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default function Settings() {
  const [activeness, setActiveness] = React.useState(30);
  const [generality, setGenerality] = React.useState(30);
  const [expanded1, setExpanded1] = React.useState(0);
  const [expanded2, setExpanded2] = React.useState(0);

  const handleActivenessChange = (event, newValue) => {
    setActiveness(newValue);
  };

  const handleGeneralityChange = (event, newValue) => {
    setGenerality(newValue);
  };

  const handleAccordion1 = (panel) => (event, newExpanded) => {
    setExpanded1(!expanded1);
  };

  const handleAccordion2 = (panel) => (event, newExpanded) => {
    setExpanded2(!expanded2);
  };

  return (
    <div>
      <Typography variant="h4">Assistant Settings</Typography>
      <h4>
        Activeness
        <Tooltip title="Learn more about Activeness" placement="top">
          <IconButton aria-label="learn more" onClick={handleAccordion1()}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </h4>
      <Slider
        value={activeness}
        onChange={handleActivenessChange}
        defaultValue={3}
        valueLabelDisplay="auto"
        aria-labelledby="activeness-slider"
        step={1}
        marks={true}
        min={1}
        max={5}
      />

      <h4>
        Generality
        <Tooltip title="Learn more about Generality" placement="top">
          <IconButton aria-label="learn more" onClick={handleAccordion2()}>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </h4>
      <Slider
        value={generality}
        onChange={handleGeneralityChange}
        defaultValue={2}
        valueLabelDisplay="auto"
        aria-labelledby="generality-slider"
        step={1}
        marks={true}
        min={1}
        max={5}
        size="large"
      />

      <Accordion expanded={expanded1} onChange={handleAccordion1()}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">More About Activeness</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Activeness here refers to how “close to the code” the assistant gets. You can think about it like a TA who is at different distances from the student. Across the room, the TA can’t do much but shout a sentence or two to the student, and will only do so when the student asks a question first. Across the table, the TA can ask the student questions about their process, but since they can’t see the student’s screen, they can’t/won’t help with specific bits of syntax. Over the students’ shoulder, they can see the code and point out what is wrong, but will not type anything in for the student. On the keyboard, they can directly type in the student’s IDE.           
            The activeness spectrum, from low to high, is as below:<br/><br/>

            1. Across the room (can’t see code, can’t type, direct q&a)<br/>
            2. Across the table (can’t see code, can’t type, Socratic conversation)<br/>
            3. Over the shoulder (can see code, can’t type, Socratic conversation)<br/>
            4. On your keyboard (can see code, can type, Socratic conversation)<br/>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded2} onChange={handleAccordion2()}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h6">More About Generality</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Generality here refers more to the amount of detail that the assistant provides with each answer. The assistant uses a “top down” approach - going from the most vague response to one that is essentially written out code. Where possible, the assistant will aim to take the user through a series of “steps” rather than just giving them the entire procedure straight away, to preserve the student's problem solvign process.
          The generality spectrum, from low to high, is as below:<br/><br/>

          1. 1-2 Sentence Summary<br/>
          2. Flowchart (i.e. high level description, few words with each step. Go step by step)<br/>
          3. Procedure<br/>
          4. Code<br/>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}