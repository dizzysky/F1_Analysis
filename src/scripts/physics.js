console.log('doo');

// Initialize PhysicsJS
const world = Physics({});

// Your DOM elements
const elements = document.querySelectorAll('*');
let bodies = [];

// Create PhysicsJS bodies for each DOM element
elements.forEach((el, index) => {
  const rect = el.getBoundingClientRect();
  const body = Physics.body('rectangle', {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    width: rect.width,
    height: rect.height
  });
  bodies.push(body);
  world.add(body);
});
console.log(world);
// Disable gravity initially
world.gravity({ x: 0, y: 0 });

// Add behavior to update DOM positions on each world step
world.on('step', function() {
  bodies.forEach((body, index) => {
    const el = elements[index];
    el.style.transform = `translate(${body.state.pos.x}px, ${body.state.pos.y}px)`;
  });
});

// Enable gravity on image click
document.querySelector('.cheeky').addEventListener('click', function() {
  world.gravity({ x: 0, y: 1 }); // Enable gravity
});




// Add some behaviors to the world
world.add([
  Physics.behavior('body-collision-detection'),
  Physics.behavior('body-impulse-response')
]);

// Function to step the world
function animate(time) {
  world.step(time);
  requestAnimationFrame(animate);
}

// Start the animation loop
requestAnimationFrame(animate);

// Kick-off the physics simulation
world.step();