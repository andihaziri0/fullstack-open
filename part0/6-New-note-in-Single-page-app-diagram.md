sequenceDiagram
    participant browser
    participant server

    Note right of browser: User clicked on submit button and callback function executed

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Status code
    deactivate server
    
    Note right of browser: The browser updates the note list without reloading the page.