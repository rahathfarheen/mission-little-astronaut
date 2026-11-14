// Quick test runner for ResourceEngine
import { ResourceEngine, SURVIVAL_STATES } from './resourceEngine.js';

console.log('--- Testing Mission: Little Astronaut Resource Engine ---');

const engine = new ResourceEngine();

// 1. Initial State Check
const initial = engine.getResources();
console.log('1. Initial Resources:', initial);
console.assert(initial.oxygen === 90, 'Initial oxygen should be 90');
console.assert(initial.water === 85, 'Initial water should be 85');
console.assert(initial.energy === 80, 'Initial energy should be 80');
console.assert(initial.radiationShield === 95, 'Initial radiationShield should be 95');

// 2. Player Action: Tend Space Crops
console.log('\n2. Executing Action: hydroponic-photosynthesis');
const resPhotosynthesis = engine.applyAction('hydroponic-photosynthesis', '9-10');
console.log('Success:', resPhotosynthesis.success);
console.log('Action Name:', resPhotosynthesis.actionName);
console.log('Deltas:', resPhotosynthesis.deltas);
console.log('New Levels:', resPhotosynthesis.currentLevels);
console.log('Explanation:', resPhotosynthesis.explanation);
console.log('Science Fact:', resPhotosynthesis.scienceFact);
console.assert(resPhotosynthesis.success === true, 'Action should succeed');

// 3. Player Action: Boost Magnetic Deflector
console.log('\n3. Executing Action: magnetic-shield-boost');
const resShield = engine.applyAction('magnetic-shield-boost', '11-12');
console.log('Deltas:', resShield.deltas);
console.log('Shield Level:', resShield.currentLevels.radiationShield);
console.log('Explanation (11-12):', resShield.explanation);

// 4. Survival State Check
console.log('\n4. Checking Survival Status:');
const status = engine.checkSurvivalStatus();
console.log('Survival State:', status.state);
console.log('Message:', status.message);
console.assert(status.isAlive === true, 'Cadet should be alive');

// 5. Simulation Tick / Passive Drain
console.log('\n5. Advancing 3 Ticks:');
for (let i = 0; i < 3; i++) {
  const tickResult = engine.tick();
  console.log(`Tick ${tickResult.turn}: O2=${tickResult.currentLevels.oxygen}, H2O=${tickResult.currentLevels.water}, Power=${tickResult.currentLevels.energy}, Shield=${tickResult.currentLevels.radiationShield}`);
}

// 6. Test Depletion and Survival Failure Condition
console.log('\n6. Testing Depletion / Failure Condition:');
engine.consumeResource('oxygen', 150, 'Catastrophic simulation breach');
const failCheck = engine.checkSurvivalStatus();
console.log('Oxygen level clamped to:', engine.getResources().oxygen);
console.log('Is Alive?:', failCheck.isAlive);
console.log('State:', failCheck.state);
console.log('Failures:', failCheck.failures);
console.assert(failCheck.state === SURVIVAL_STATES.FAILED, 'Should trigger FAILED state');
console.assert(failCheck.isAlive === false, 'Cadet is not alive when oxygen is 0');

// 7. Reset test
console.log('\n7. Resetting Engine:');
engine.reset();
console.log('Reset Resources:', engine.getResources());
console.assert(engine.getResources().oxygen === 90, 'Oxygen reset back to 90');

console.log('\n ALL RESOURCE ENGINE TESTS PASSED SUCCESSFULLY! ');
