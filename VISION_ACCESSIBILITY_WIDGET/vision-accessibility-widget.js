class VisionAccessibilityWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.storageKey = 'vision-accessibility-settings';

    this.state = {
      open: false,
      fontSize: 'normal',
      theme: 'default',
      letterSpacing: false,
      readableFont: false,
    };
  }

  connectedCallback() {
    this.loadState();
    this.render();
    this.applySettings();
  }

  loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(this.storageKey));
      if (saved) {
        this.state = { ...this.state, ...saved, open: false };
      }
    } catch {
      // ignore broken localStorage state
    }
  }

  saveState() {
    const { open, ...settings } = this.state;
    localStorage.setItem(this.storageKey, JSON.stringify(settings));
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.saveState();
    this.render();
    this.applySettings();
  }

  applySettings() {
    const root = document.documentElement;

    root.classList.remove(
      'va-font-normal',
      'va-font-large',
      'va-font-xlarge',
      'va-theme-default',
      'va-theme-contrast',
      'va-theme-light',
      'va-readable-font',
      'va-letter-spacing'
    );

    root.classList.add(`va-font-${this.state.fontSize}`);
    root.classList.add(`va-theme-${this.state.theme}`);

    if (this.state.readableFont) {
      root.classList.add('va-readable-font');
    }

    if (this.state.letterSpacing) {
      root.classList.add('va-letter-spacing');
    }

    this.ensureGlobalStyles();
  }

  ensureGlobalStyles() {
    if (document.getElementById('vision-accessibility-global-styles')) return;

    const style = document.createElement('style');
    style.id = 'vision-accessibility-global-styles';

    style.textContent = `
      html.va-font-normal {
        font-size: 100%;
      }

      html.va-font-large {
        font-size: 112.5%;
      }

      html.va-font-xlarge {
        font-size: 125%;
      }

      html.va-readable-font body,
      html.va-readable-font button,
      html.va-readable-font input,
      html.va-readable-font textarea,
      html.va-readable-font select {
        font-family: Arial, Helvetica, sans-serif !important;
      }

      html.va-letter-spacing body {
        letter-spacing: 0.04em;
        line-height: 1.7;
      }

      html.va-theme-contrast body {
        background: #000 !important;
        color: #fff !important;
      }

      html.va-theme-contrast a {
        color: #ffff00 !important;
        text-decoration: underline !important;
      }

      html.va-theme-contrast button,
      html.va-theme-contrast input,
      html.va-theme-contrast textarea,
      html.va-theme-contrast select {
        background: #000 !important;
        color: #fff !important;
        border-color: #fff !important;
      }

      html.va-theme-contrast img,
      html.va-theme-contrast video,
      html.va-theme-contrast canvas {
        filter: grayscale(1) contrast(1.15);
      }

      html.va-theme-light body {
        background: #fff !important;
        color: #000 !important;
      }

      html.va-theme-light a {
        color: #003cff !important;
        text-decoration: underline !important;
      }

      html.va-theme-light button,
      html.va-theme-light input,
      html.va-theme-light textarea,
      html.va-theme-light select {
        background: #fff !important;
        color: #000 !important;
        border-color: #000 !important;
      }
    `;

    document.head.appendChild(style);
  }

  resetSettings() {
    localStorage.removeItem(this.storageKey);

    this.state = {
      open: false,
      fontSize: 'normal',
      theme: 'default',
      letterSpacing: false,
      readableFont: false,
    };

    this.render();
    this.applySettings();
  }

  render() {
    const isOpen = this.state.open;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 99999;
          font-family: Arial, Helvetica, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .widget {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }

        .toggle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 2px solid #111;
          border-radius: 999px;
          padding: 12px 16px;
          background: #fff;
          color: #111;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }

        .toggle:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
        }

        .toggle:focus-visible,
        .control:focus-visible,
        .reset:focus-visible,
        .close:focus-visible {
          outline: 3px solid #ffcc00;
          outline-offset: 3px;
        }

        .icon {
          font-size: 20px;
          line-height: 1;
        }

        .panel {
          width: min(340px, calc(100vw - 32px));
          padding: 18px;
          border: 2px solid #111;
          border-radius: 18px;
          background: #fff;
          color: #111;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
        }

        .panel[hidden] {
          display: none;
        }

        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .title {
          margin: 0;
          font-size: 18px;
          line-height: 1.25;
          font-weight: 800;
        }

        .subtitle {
          margin: 4px 0 0;
          font-size: 13px;
          line-height: 1.4;
          color: #555;
        }

        .close {
          width: 32px;
          height: 32px;
          border: 1px solid #ddd;
          border-radius: 50%;
          background: #f7f7f7;
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
        }

        .group {
          padding-top: 14px;
          margin-top: 14px;
          border-top: 1px solid #e5e5e5;
        }

        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
        }

        .controls {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .controls.two {
          grid-template-columns: repeat(2, 1fr);
        }

        .control,
        .reset {
          min-height: 42px;
          border: 2px solid #d6d6d6;
          border-radius: 12px;
          background: #fafafa;
          color: #111;
          cursor: pointer;
          font-weight: 700;
          transition: border-color 140ms ease, background 140ms ease;
        }

        .control:hover,
        .reset:hover {
          border-color: #111;
          background: #f0f0f0;
        }

        .control.active {
          border-color: #111;
          background: #111;
          color: #fff;
        }

        .font-a {
          font-size: 16px;
        }

        .font-aa {
          font-size: 20px;
        }

        .font-aaa {
          font-size: 24px;
        }

        .theme-default {
          background: #fff;
          color: #111;
        }

        .theme-contrast {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .theme-light {
          background: #fff;
          color: #000;
          border-color: #000;
        }

        .reset {
          width: 100%;
          margin-top: 14px;
          background: #fff4f4;
          border-color: #f0b4b4;
          color: #8a0000;
        }

        @media (max-width: 520px) {
          :host {
            right: 12px;
            bottom: 12px;
          }

          .toggle {
            padding: 11px 14px;
            font-size: 14px;
          }
        }
      </style>

      <div class="widget">
        <section class="panel" ${isOpen ? '' : 'hidden'} aria-label="Налаштування доступності">
          <div class="header">
            <div>
              <h2 class="title">Людям із порушенням зору</h2>
              <p class="subtitle">Налаштуйте розмір тексту, контраст і читабельність сайту.</p>
            </div>

            <button class="close" type="button" aria-label="Закрити панель">×</button>
          </div>

          <div class="group">
            <span class="label">Розмір шрифту:</span>
            <div class="controls">
              <button class="control font-a ${this.state.fontSize === 'normal' ? 'active' : ''}" data-font="normal" type="button">A</button>
              <button class="control font-aa ${this.state.fontSize === 'large' ? 'active' : ''}" data-font="large" type="button">A</button>
              <button class="control font-aaa ${this.state.fontSize === 'xlarge' ? 'active' : ''}" data-font="xlarge" type="button">A</button>
            </div>
          </div>

          <div class="group">
            <span class="label">Колір сайту:</span>
            <div class="controls">
              <button class="control theme-default ${this.state.theme === 'default' ? 'active' : ''}" data-theme="default" type="button">A</button>
              <button class="control theme-contrast ${this.state.theme === 'contrast' ? 'active' : ''}" data-theme="contrast" type="button">A</button>
              <button class="control theme-light ${this.state.theme === 'light' ? 'active' : ''}" data-theme="light" type="button">A</button>
            </div>
          </div>

          <div class="group">
            <span class="label">Додатково:</span>
            <div class="controls two">
              <button class="control ${this.state.readableFont ? 'active' : ''}" data-toggle="readableFont" type="button">
                Простий шрифт
              </button>
              <button class="control ${this.state.letterSpacing ? 'active' : ''}" data-toggle="letterSpacing" type="button">
                Більші інтервали
              </button>
            </div>
          </div>

          <button class="reset" type="button">
            Звичайна версія сайту
          </button>
        </section>

        <button 
          class="toggle" 
          type="button" 
          aria-expanded="${isOpen ? 'true' : 'false'}"
          aria-label="Відкрити налаштування для людей із порушенням зору"
        >
          <span class="icon" aria-hidden="true">👁</span>
          <span>Людям із порушенням зору</span>
        </button>
      </div>
    `;

    this.shadowRoot.querySelector('.toggle').addEventListener('click', () => {
      this.setState({ open: !this.state.open });
    });

    this.shadowRoot.querySelector('.close').addEventListener('click', () => {
      this.setState({ open: false });
    });

    this.shadowRoot.querySelectorAll('[data-font]').forEach((button) => {
      button.addEventListener('click', () => {
        this.setState({ fontSize: button.dataset.font });
      });
    });

    this.shadowRoot.querySelectorAll('[data-theme]').forEach((button) => {
      button.addEventListener('click', () => {
        this.setState({ theme: button.dataset.theme });
      });
    });

    this.shadowRoot.querySelectorAll('[data-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.toggle;
        this.setState({ [key]: !this.state[key] });
      });
    });

    this.shadowRoot.querySelector('.reset').addEventListener('click', () => {
      this.resetSettings();
    });
  }
}

customElements.define('vision-accessibility-widget', VisionAccessibilityWidget);