/**
 * Core Resource Management Engine for Mission: Little Astronaut
 * Target Audience: Children aged 7-12
 * 
 * Systems Managed:
 * 1. Oxygen (O2)
 * 2. Water (H2O)
 * 3. Electricity & Battery Power (Energy)
 * 4. Radiation Shielding (Shield)
 * 
 * PURE JAVASCRIPT ENGINE - ZERO REACT DEPENDENCIES
 * Designed for modular separation of game logic from UI presentation.
 */

import {
  RESOURCE_CONFIGS,
  RESOURCE_ACTIONS,
  ENVIRONMENTAL_EVENTS,
  EDUCATIONAL_DISCLAIMER
} from '../data/resourceData.js';

export const SURVIVAL_STATES = {
  OPTIMAL: 'OPTIMAL',   // All resources > 65%
  STABLE: 'STABLE',     // All resources > 30%
  WARNING: 'WARNING',   // At least one resource <= 30%
  CRITICAL: 'CRITICAL', // At least one resource <= 12%
  FAILED: 'FAILED'      // Any resource <= 0%
};

export class ResourceEngine {
  /**
   * @param {Object} [customInitialState] Optional override for starting resource levels
   */
  constructor(customInitialState = {}) {
    this.configs = { ...RESOURCE_CONFIGS };
    this.actions = [...RESOURCE_ACTIONS];
    this.events = [...ENVIRONMENTAL_EVENTS];
    this.disclaimer = EDUCATIONAL_DISCLAIMER;

    // Turn / cycle counter
    this.turn = 1;
    this.history = [];

    // Initialize state with starting values and bounds
    this.state = {};
    for (const key of Object.keys(this.configs)) {
      const cfg = this.configs[key];
      const startingVal = customInitialState[key] !== undefined 
        ? customInitialState[key] 
        : cfg.startingValue;
      this.state[key] = this._clamp(startingVal, cfg.minValue, cfg.maxValue);
    }
  }

  /**
   * Helper to clamp numerical values within min and max boundaries
   * @private
   */
  _clamp(value, min, max) {
    return Math.max(min, Math.min(max, Math.round(value * 10) / 10));
  }

  /**
   * Get current resource levels
   * @returns {Object} Clone of current resource levels
   */
  getResources() {
    return { ...this.state };
  }

  /**
   * Get detailed metadata and status for a single resource
   * @param {string} resourceId 'oxygen' | 'water' | 'energy' | 'radiationShield'
   */
  getResourceStatus(resourceId) {
    const cfg = this.configs[resourceId];
    if (!cfg) throw new Error(`Unknown resource id: ${resourceId}`);

    const value = this.state[resourceId];
    let healthTier = 'OPTIMAL';
    if (value <= cfg.minValue) healthTier = 'DEPLETED';
    else if (value <= cfg.criticalThreshold) healthTier = 'CRITICAL';
    else if (value <= cfg.warningThreshold) healthTier = 'WARNING';
    else if (value < cfg.optimalThreshold) healthTier = 'NOMINAL';

    return {
      id: resourceId,
      name: cfg.name,
      shortName: cfg.shortName,
      icon: cfg.icon,
      unit: cfg.unit,
      value,
      min: cfg.minValue,
      max: cfg.maxValue,
      healthTier,
      isWarning: value <= cfg.warningThreshold,
      isCritical: value <= cfg.criticalThreshold,
      color: cfg.color,
      educationalSummary: cfg.educationalSummary,
      nasaScienceContext: cfg.nasaScienceContext
    };
  }

  /**
   * Get the catalog of all possible cadet actions
   */
  getActions() {
    return this.actions.map(action => ({
      ...action,
      canAfford: this.canAffordAction(action.id)
    }));
  }

  /**
   * Check if the habitat has sufficient energy/water to perform an action
   * @param {string} actionId 
   */
  canAffordAction(actionId) {
    const action = this.actions.find(a => a.id === actionId);
    if (!action) return false;

    if (!action.cost) return true;
    for (const [resKey, costVal] of Object.entries(action.cost)) {
      if (this.state[resKey] < costVal) {
        return false;
      }
    }
    return true;
  }

  /**
   * Execute a player action that updates resources with educational feedback
   * @param {string} actionId 
   * @param {string} [ageGroup='9-10'] '7-8' | '9-10' | '11-12'
   * @returns {Object} Result containing updated resources, deltas, and child-friendly explanation
   */
  applyAction(actionId, ageGroup = '9-10') {
    const action = this.actions.find(a => a.id === actionId);
    if (!action) {
      return {
        success: false,
        error: `Action "${actionId}" does not exist in Mission Control catalog.`
      };
    }

    // Check if player has enough resources to pay the action cost
    if (!this.canAffordAction(actionId)) {
      const missingResources = Object.entries(action.cost || {})
        .filter(([resKey, costVal]) => this.state[resKey] < costVal)
        .map(([resKey]) => this.configs[resKey].name);

      return {
        success: false,
        actionId,
        error: `Cannot perform ${action.name}! Not enough ${missingResources.join(' and ')} in habitat reserves.`,
        tip: 'Try harvesting or generating the required resource first!'
      };
    }

    const previousLevels = { ...this.state };
    const deltas = {};

    // Deduct costs
    if (action.cost) {
      for (const [resKey, costVal] of Object.entries(action.cost)) {
        this.state[resKey] = this._clamp(
          this.state[resKey] - costVal,
          this.configs[resKey].minValue,
          this.configs[resKey].maxValue
        );
        deltas[resKey] = -costVal;
      }
    }

    // Apply benefits
    if (action.benefit) {
      for (const [resKey, benefitVal] of Object.entries(action.benefit)) {
        const oldVal = this.state[resKey];
        this.state[resKey] = this._clamp(
          this.state[resKey] + benefitVal,
          this.configs[resKey].minValue,
          this.configs[resKey].maxValue
        );
        deltas[resKey] = (deltas[resKey] || 0) + (this.state[resKey] - oldVal);
      }
    }

    // Determine age-adapted explanation
    const ageCategory = ['7-8', '9-10', '11-12'].includes(ageGroup) ? ageGroup : '9-10';
    const explanation = action.explanations[ageCategory] || action.explanations['9-10'];

    // Check overall habitat survival condition
    const survivalStatus = this.checkSurvivalStatus();

    const record = {
      turn: this.turn,
      actionId,
      actionName: action.name,
      previousLevels,
      currentLevels: { ...this.state },
      deltas,
      explanation,
      scienceFact: action.scienceFact,
      survivalStatus
    };

    this.history.unshift(record);

    return {
      success: true,
      ...record
    };
  }

  /**
   * Direct resource recovery function
   * @param {string} resourceId 
   * @param {number} amount 
   * @param {string} [reason='Replenishment']
   */
  recoverResource(resourceId, amount, reason = 'Replenishment') {
    const cfg = this.configs[resourceId];
    if (!cfg) throw new Error(`Unknown resource ${resourceId}`);

    const before = this.state[resourceId];
    this.state[resourceId] = this._clamp(before + amount, cfg.minValue, cfg.maxValue);
    const delta = this.state[resourceId] - before;

    return {
      resourceId,
      delta,
      newLevel: this.state[resourceId],
      reason
    };
  }

  /**
   * Direct resource consumption function
   * @param {string} resourceId 
   * @param {number} amount 
   * @param {string} [reason='Consumption']
   */
  consumeResource(resourceId, amount, reason = 'Consumption') {
    const cfg = this.configs[resourceId];
    if (!cfg) throw new Error(`Unknown resource ${resourceId}`);

    const before = this.state[resourceId];
    this.state[resourceId] = this._clamp(before - amount, cfg.minValue, cfg.maxValue);
    const delta = before - this.state[resourceId];

    return {
      resourceId,
      delta: -delta,
      newLevel: this.state[resourceId],
      reason
    };
  }

  /**
   * Advances the simulation by one turn or time-tick.
   * Applies basal metabolic and habitat passive consumption, plus potential environmental events.
   * @param {Object} [options]
   * @param {boolean} [options.triggerRandomEvent=false]
   * @returns {Object} Simulation step outcome
   */
  tick({ triggerRandomEvent = false } = {}) {
    this.turn += 1;
    const previousLevels = { ...this.state };
    const passiveDeltas = {};

    // 1. Passive life support & basal consumption
    for (const key of Object.keys(this.configs)) {
      const cfg = this.configs[key];
      const drain = cfg.passiveDrainPerTick || 1.0;
      this.state[key] = this._clamp(this.state[key] - drain, cfg.minValue, cfg.maxValue);
      passiveDeltas[key] = -drain;
    }

    // 2. Optional Environmental Event (e.g. Solar flare, dust storm)
    let triggeredEvent = null;
    if (triggerRandomEvent && Math.random() < 0.4 && this.events.length > 0) {
      const picked = this.events[Math.floor(Math.random() * this.events.length)];
      triggeredEvent = picked;

      if (picked.drain) {
        for (const [k, v] of Object.entries(picked.drain)) {
          this.state[k] = this._clamp(this.state[k] - v, this.configs[k].minValue, this.configs[k].maxValue);
        }
      }
      if (picked.bonus) {
        for (const [k, v] of Object.entries(picked.bonus)) {
          this.state[k] = this._clamp(this.state[k] + v, this.configs[k].minValue, this.configs[k].maxValue);
        }
      }
    }

    const survivalStatus = this.checkSurvivalStatus();

    return {
      turn: this.turn,
      previousLevels,
      currentLevels: { ...this.state },
      passiveDeltas,
      event: triggeredEvent,
      survivalStatus
    };
  }

  /**
   * Check life support survival conditions and return health state
   * @returns {Object} Survival analysis and recommendations
   */
  checkSurvivalStatus() {
    const warnings = [];
    const criticals = [];
    const failures = [];

    // Detailed check across all 4 systems
    for (const [key, cfg] of Object.entries(this.configs)) {
      const val = this.state[key];
      if (val <= cfg.minValue) {
        failures.push({
          system: key,
          name: cfg.name,
          message: `🚨 ${cfg.name} DEPLETED to 0%! Immediate habitat emergency!`
        });
      } else if (val <= cfg.criticalThreshold) {
        criticals.push({
          system: key,
          name: cfg.name,
          message: `⚠️ Critical: ${cfg.name} is dangerously low (${val}%).`
        });
      } else if (val <= cfg.warningThreshold) {
        warnings.push({
          system: key,
          name: cfg.name,
          message: `Notice: ${cfg.name} is below recommended levels (${val}%).`
        });
      }
    }

    // Determine overall survival state
    let state = SURVIVAL_STATES.OPTIMAL;
    let message = '🌟 All life support systems are in optimal balance! Lunar Base Alpha is thriving.';
    let isAlive = true;

    if (failures.length > 0) {
      state = SURVIVAL_STATES.FAILED;
      isAlive = false;
      message = `MISSION FAILURE: ${failures.map(f => f.name).join(' & ')} depleted! Cadet life support failed.`;
    } else if (criticals.length > 0) {
      state = SURVIVAL_STATES.CRITICAL;
      message = `EMERGENCY ALERT: ${criticals.map(c => c.name).join(', ')} require urgent recovery!`;
    } else if (warnings.length > 0) {
      state = SURVIVAL_STATES.WARNING;
      message = `CAUTION: Life support systems need attention: ${warnings.map(w => w.name).join(', ')}.`;
    } else {
      // Check if any resource is under optimal (Nominal vs Optimal)
      const isNominal = Object.entries(this.configs).some(([k, cfg]) => this.state[k] < cfg.optimalThreshold);
      if (isNominal) {
        state = SURVIVAL_STATES.STABLE;
        message = '👍 Habitat life support is stable. Regular maintenance recommended.';
      }
    }

    return {
      state,
      isAlive,
      message,
      warnings,
      criticals,
      failures
    };
  }

  /**
   * Reset engine back to fresh starting values
   */
  reset() {
    this.turn = 1;
    this.history = [];
    for (const key of Object.keys(this.configs)) {
      this.state[key] = this.configs[key].startingValue;
    }
    return this.getResources();
  }

  /**
   * Export serializable snapshot for saving or sending to backend
   */
  exportSnapshot() {
    return {
      turn: this.turn,
      state: { ...this.state },
      history: [...this.history]
    };
  }

  /**
   * Restore state from a previously saved snapshot
   * @param {Object} snapshot 
   */
  importSnapshot(snapshot) {
    if (!snapshot || !snapshot.state) return false;
    this.turn = snapshot.turn || 1;
    this.history = snapshot.history || [];
    for (const key of Object.keys(this.configs)) {
      if (snapshot.state[key] !== undefined) {
        this.state[key] = this._clamp(
          snapshot.state[key],
          this.configs[key].minValue,
          this.configs[key].maxValue
        );
      }
    }
    return true;
  }
}
