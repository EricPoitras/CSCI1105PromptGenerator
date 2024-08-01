// Variables for storing option and skill
let option, skill;

// Helper function to select an element by ID
function getElementById(id) {
    return document.getElementById(id);
}

// Assistant Options
function optionSelected(clicked_id) {
    option = clicked_id;
    viewController(1);
}

function optionHover(clicked_id) {
    const btn = getElementById(clicked_id);
    btn.classList.add("border-dark");

    const arrow = btn.querySelector(".btnArrow");
    arrow.classList.remove("d-none");
}

function optionLeave(clicked_id) {
    const btn = getElementById(clicked_id);
    btn.classList.remove("border-dark");

    const arrow = btn.querySelector(".btnArrow");
    arrow.classList.add("d-none");
}

// Skills Options
function skillSelected(clicked_id) {
    skill = clicked_id;
    viewController(2);
}

function skillHover(clicked_id) {
    const btn = getElementById(clicked_id);
    btn.classList.add("border-dark");
}

function skillLeave(clicked_id) {
    const btn = getElementById(clicked_id);
    btn.classList.remove("border-dark");
}

// Skills Filters
function handleFilter(filter) {
    const filterIdToClassMap = {
        "skill-view-reading": ".prompt-reading",
        "skill-view-writing": ".prompt-writing",
        "skill-view-revising": ".prompt-revising"
    };

    const listSelector = filterIdToClassMap[filter.id];
    if (!listSelector) {
        alert("Error");
        return;
    }

    const list = document.querySelectorAll(listSelector);
    list.forEach(item => {
        item.parentNode.classList.toggle("d-none", !filter.checked);
    });
}

// Copy to Clipboard
function copyToClipboard() {
    const textBox = getElementById("textBox");
    textBox.select();
    document.execCommand("copy");
    console.log(textBox.value);
}

// View Controller
function viewController(view) {
    // Update step icon in the navigation bar
    const stepCircles = document.querySelectorAll(".step-bar-circle");
    stepCircles.forEach((circle, index) => {
        circle.classList.toggle("step-bar-circle-disabled", index !== view);
    });

    // Update view
    const views = document.querySelectorAll(".ui-view");
    views.forEach((viewElement, index) => {
        viewElement.classList.toggle("d-none", index !== view);
    });

    // Update title and instructions
    const viewDetails = [
        {
            title: "Select your coding assistant type",
            instruction: "You can choose an instructor, coach, or peer"
        },
        {
            title: "Select your prompt",
            instruction: "Select and complete any of the tasks listed below"
        },
        {
            title: "Review your prompt",
            instruction: "Customize the prompt details as needed, then copy them to your clipboard"
        }
    ];

    if (view >= 0 && view < viewDetails.length) {
        const { title, instruction } = viewDetails[view];
        getElementById("title").innerHTML = title;
        getElementById("instructions").innerHTML = instruction;

        if (view === 2) promptCreator();
    } else {
        alert("Error");
    }
}

// Create the Prompt
function promptCreator() {
    const agentOptions = [
        "You are a friendly and helpful tutor who helps students to learn how to program in Java by explaining ideas as simple as possible without sacrificing accuracy or detail.\n"+
        "Start by introducing yourself to the student as their AI-Tutor who is happy to help them with any questions. Always wait for the student to respond before asking a question. Ask one question at a time.\n"+
        "First, ask them what they would like to learn about. Wait for the response. \n"+
        "Then ask them whether they would like to [INSERT PROMPT STATEMENT] a code segment or whether they would prefer to be given example code. Wait for their response.\n"+
        "Using this information answer the question as directly as possible. Explain your answer in a clear and simple manner. Do not assume student knowledge of any related concepts, domain knowledge, or jargon.\n"+
        "You should help students by developing effective explanations, analogies and examples of concepts taught in introductory programming. Add comments next to code and invite students to ask whether they have any questions."+
        "When a student demonstrates that they know the concept you can move the conversation to a close and tell them you’re here to help if they have further questions.",
        "You are a friendly and helpful tutor who helps students to learn how to program in Java by explaining ideas and asking students questions.\n"+
        "Start by introducing yourself to the student as their AI-Tutor who is happy to help them with any questions. Always wait for the student to respond before asking a question. Ask one question at a time.\n"+
        "First, ask them what they would like to learn about. Wait for the response.\n"+
        "Then ask them whether they would like to share a code segment or whether they would prefer to be given example code. Wait for their response.\n"+
        "Then ask the student to [INSERT PROMPT STATEMENT]. Wait for a response.\n"+
        "When the student writes a response, then work with the student to provide clear and simple feedback. Do not assume student knowledge of any related concepts, domain knowledge, or jargon.\n"+
        "You should guide students in an open-ended way. Do not provide immediate answers or solutions to problems but help students generate their own answers by asking leading questions.\n"+
        "When a student demonstrates that they know the concept you can move the conversation to a close and tell them you’re here to help if they have further questions.",
        "You are a student who has studied programming in Java.\n"+
        "Start by introducing yourself as a student who is happy to share what you know about the topic of the teacher’s choosing. The goal for the exercise is for the teacher to evaluate your responses. Wait for the teacher to respond before moving ahead.\n"+
        "First, ask the teacher what they would like you to explain and how they would like you to apply that topic. [INSERT PROMPT STATEMENT]\n"+
        "Then ask them whether they would like to share a code segment or whether they would prefer to be given example code. Wait for their response.\n"+
        "Produce an answer. Then ask the teacher how well you did and ask them to explain what you got right or wrong in your examples and explanation and how you can improve next time.\n"+
        "Tell the teacher that if you got everything right, you'd like to hear how your application of the concept was spot on.\n"+
        "Wrap up the conversation by thanking the teacher."
    ];

    const skillOptions = [
        "Trace program execution and predict the output. ",
        "Create a tracing table to show how the program outputs differ based on different inputs. ",
        "Explain the purpose of this code line-by-line. ",
        "Explain the purpose of this program in your own words. ",
        "Give me pseudocode statements to translate into code. ",
        "Describe steps for an algorithm to implement the solution. ",
        "Complete the code solution by writing the missing steps. ",
        "Show me an alternate way to solve this same problem. ",
        "Critique code like an experienced programmer would provide suggestions for improvement. ",
        "Suggest specific ways to improve the code. ",
        "Help me write test cases to evaluate the solution. ",
        "Help me fix this issue or error with my code. "
    ];

    const agentOptionMap = {
        "btnInstructor": agentOptions[0],
        "btnCoach": agentOptions[1],
        "btnPeer": agentOptions[2]
    };

    const skillOptionMap = {
        "skill-1": skillOptions[0],
        "skill-2": skillOptions[1],
        "skill-3": skillOptions[2],
        "skill-4": skillOptions[3],
        "skill-5": skillOptions[4],
        "skill-6": skillOptions[5],
        "skill-7": skillOptions[6],
        "skill-8": skillOptions[7],
        "skill-9": skillOptions[8],
        "skill-10": skillOptions[9],
        "skill-11": skillOptions[10],
        "skill-12": skillOptions[11]
    };

    const text = agentOptionMap[option];
    const skillDescription = skillOptionMap[skill];

    if (!text || !skillDescription) {
        alert("Error - prompt creator");
        return;
    }

    const promptText = text.replace("[INSERT PROMPT STATEMENT]", skillDescription);
    getElementById("textBox").value = promptText;
}


