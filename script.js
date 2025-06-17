const container = document.getElementById("eventsContainer");
const resultCount = document.getElementById("resultCount");
const searchBar = document.getElementById("searchBar");

let events = [];

//Loading events
fetch("events.json")
  .then(response => response.json())
  .then(data => 
    {
    events = data;
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    displayEvents(events);
    }
)
  .catch(error => 
    {
    console.error("Error loading events:", error);
    container.innerHTML = "<p class='text-danger'>Failed to load events.</p>";
    }
);

//Displaying events
function displayEvents(eventList) 
{
  container.innerHTML = "";

  if (eventList.length === 0) 
    {
    resultCount.textContent = "No events match your search.";
    return;
    } 
  else 
  {
    resultCount.textContent = `${eventList.length} event(s) found`;
  }

  eventList.forEach(event => 
    {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 mb-4";

    const card = document.createElement("div");
    card.className = "card p-3 h-100";

    card.innerHTML = `
      <article>
        <h5>${event.name}</h5>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
        <button class="btn btn-register" aria-label="Register for ${event.name}">Register</button>
      </article>
    `;

    col.appendChild(card);
    container.appendChild(col);
    }
);
}

//Live filter
searchBar.addEventListener("input", () => 
    {
  const keyword = searchBar.value.toLowerCase();
  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(keyword) ||
    e.description.toLowerCase().includes(keyword) ||
    e.location.toLowerCase().includes(keyword)
  );
  displayEvents(filtered);
    }
);
