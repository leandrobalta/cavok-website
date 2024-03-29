import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Step {
    label: string;
    content: React.ReactNode;
    optional: boolean;
}

export interface HorizontalLinearStepperProps {
    steps: Step[];
    backButtonTitle?: string;
    backCustomButton?: React.ReactNode;
    nextButtonTitle?: string;
    nextCustomButton?: React.ReactNode;
    finishButtonTitle?: string;
    finishCustomButton?: React.ReactNode;
    skipButtonTitle?: string;
    skipCustomButton?: React.ReactNode;
}

export default function HorizontalLinearStepper(props: HorizontalLinearStepperProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!props.steps[activeStep].optional) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            alert("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {props.steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (step.optional) {
                        labelProps.optional = <Typography variant="caption">{
                            "Opcional"
                        }</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step {...stepProps}>
                            <StepLabel {...labelProps}>{step.content}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === props.steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {props.steps[activeStep] && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext}>{activeStep === props.steps.length - 1 ? "Finish" : "Next"}</Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
