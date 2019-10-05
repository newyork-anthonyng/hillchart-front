import Component from '@ember/component';
import gaussian from 'gaussian';

const MEAN = 0;
const VARIANCE = 0.5;
const distribution = gaussian(MEAN, VARIANCE);
function normalDistribution(x) {
    return distribution.pdf(x) * 1.5;
}
const X_AXIS_RANGE = 5;
// From a percentage between 0% - 100%, get the corresponding x-value for the bell curve, given the X Axis Range
 function getNormalizedX(xPercentage) {
    return (xPercentage * X_AXIS_RANGE) - (X_AXIS_RANGE / 2);
}

export default Component.extend({
  onDeleteChart() {},
  onUpdateChart() {},

  init() {
    this._super(...arguments);
    this.set('isDragging', false);
    this.set('percent', 0); // from 0 to 1
  },

  didInsertElement() {
    this.drawBellCurve();
    this.setEventHandler();
    this.positionButton();
  },

  willDestroyElement() {
    document.removeEventListener('mousemove', this.get('handleDocumentMouseMove'));
    document.removeEventListener('mouseup', this.get('handleDocumentMouseUp'));
  },

  positionButton() {
    if (this.get('progress')) {
      const { xPosition, yPosition } = this.getXAndYPositionFromPercent(this.get('progress') / 100);
      this.setButtonPosition(xPosition, yPosition);
    }
  },

  setEventHandler() {
    const $trackContainer = this.get('element').querySelector('.js-track-container');
    const $trackButton = this.get('element').querySelector('.js-track-button');
    this.set('$trackContainer', $trackContainer);
    this.set('$trackButton', $trackButton);

    $trackButton.addEventListener('mousedown', () => {
        this.set('isDragging', true);
    });

    const handleDocumentMouseMove = e => {
      if (!this.get('isDragging')) {
          return;
      }

      const { xPosition, yPosition } = this.getXAndYPositionFromPosition(e.clientX);
      this.setButtonPosition(xPosition, yPosition);
    }
    this.set('handleDocumentMouseMove', handleDocumentMouseMove);
    document.addEventListener('mousemove', handleDocumentMouseMove);

    const handleDocumentMouseUp = () => {
      this.set('isDragging', false);
      this.onUpdateChart(this.id, this.percent);
    };
    this.set('handleDocumentMouseUp', handleDocumentMouseUp);
    document.addEventListener('mouseup', handleDocumentMouseUp);

    $trackButton.addEventListener('keydown', e => {
      const keyCode = e.key;
      let direction = 0;
      if (keyCode === 'ArrowRight') {
          direction = 1;
      } else if (keyCode === 'ArrowLeft') {
          direction = -1;
      } else {
          return;
      }

      const STEP_INCREMENT = 10;
      const step = direction * STEP_INCREMENT;
      const originalX = $trackButton.style.left ?
        +$trackButton.style.left.substring(0, $trackButton.style.left.length - 2) :
        0.1;
      const { xPosition, yPosition } = this.getXAndYPositionFromPosition(originalX + step);
      this.setButtonPosition(xPosition, yPosition);

      this.onUpdateChart(this.id, this.percent);
    });
  },

  getXAndYPositionFromPosition(rawXPosition) {
    const { $trackContainer, $trackButton } = this;
    const xPosition = Math.max(0, Math.min(rawXPosition, $trackContainer.clientWidth - $trackButton.clientWidth));
    const xPercentage = xPosition / ($trackContainer.clientWidth - $trackButton.clientWidth);
    this.set('percent', xPercentage);
    const normalizedX = getNormalizedX(xPercentage);
    const yPercentage = normalDistribution(normalizedX);
    const yPosition = $trackContainer.clientHeight - ($trackContainer.clientHeight * yPercentage) - $trackButton.clientHeight;

    return {
      xPosition,
      yPosition
    };
  },

  getXAndYPositionFromPercent(percent) {
    const { $trackContainer, $trackButton } = this;
    const xPosition = percent * ($trackContainer.clientWidth - $trackButton.clientWidth);
    this.set('percent', percent);
    const normalizedX = getNormalizedX(percent);
    const yPercentage = normalDistribution(normalizedX);
    const yPosition = $trackContainer.clientHeight - ($trackContainer.clientHeight * yPercentage) - $trackButton.clientHeight;

    return {
      xPosition,
      yPosition
    };
  },

  drawBellCurve() {
    const $canvas = this.get('element').querySelector('.js-canvas');
    const ctx = $canvas.getContext('2d');

    ctx.moveTo(0, $canvas.clientHeight);
    for (let i  = 0; i < 100; i += 0.1) {
        const xPosition = (i / 100) * $canvas.clientWidth;
        const normalizedX = getNormalizedX(i / 100);
        const yPercentage = normalDistribution(normalizedX);
        const yPosition = $canvas.clientHeight - (yPercentage * $canvas.clientHeight);
        ctx.lineTo(xPosition, yPosition);
    }

    ctx.stroke();
  },

  deleteChart() {
    this.onDeleteChart(this.id);
  },

  setButtonPosition(xPosition, yPosition) {
    const { $trackButton } = this;
    $trackButton.style.left = `${xPosition}px`;
    $trackButton.style.top = `${yPosition}px`;
  },

  actions: {
    deleteChart() {
      this.deleteChart();
    }
  }
});
