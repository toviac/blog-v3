/* eslint-disable */

/**
 * @fileoverview viewport - calculates viewport position
 * @version 0.0.6
 *
 * @license MIT, see http://github.com/asvd/viewport
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */

/*
(function (root, factory) {
  console.log('exports: ', exports);
  if (typeof define === 'function' && define.amd) {
      define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
      factory(exports);
  } else {
      factory((root.viewport = {}));
  }
}(this, function (exports) {
*/
const viewport = () => {
  let entries = []; // each entry contains a viewport with sections
  const ctx = 40; // context to substract from the scroll targets

  // for better compression
  const VIEWPORT = 'viewport';
  const EventListener = 'EventListener';
  const addEventListener = `add${EventListener}`;
  const removeEventListener = `remove${EventListener}`;
  const getBoundingClientRect = 'getBoundingClientRect';

  const top = 'top';
  const bottom = 'bottom';
  const left = 'left';
  const right = 'right';

  const Top = 'Top';
  const Left = 'Left';

  const Location = 'Location';
  const Start = 'Start';
  const End = 'End';
  const Scroll = 'Scroll';
  const Target = 'Target';
  const scroll = 'scroll';
  const resize = 'resize';
  const length = 'length';
  const _window = window;
  const _document = document;
  const _null = null;
  const _Math = Math;
  const Math_min = _Math.min;
  const Math_max = _Math.max;
  const Math_abs = _Math.abs;


  // updates section dimensions upon resize
  // (to avoid calling expensive getBoundingClientRect()
  // on each scrolling act)
  const updateDimensions = function () {
    let i,
      j,
      entry,
      section,
      offset,
      vRect,
      sRect;
    for (i = 0; i < entries.length; i++) {
      entry = entries[i];
      vRect = entry.r[getBoundingClientRect]();
      offset = {
        top: entry.r.scrollTop,
        left: entry.r.scrollLeft,
      };

      entry.r.rect = {
        left: vRect.left,
        top: vRect.top,
        right: vRect.right,
        bottom: vRect.bottom,
        width: vRect.right - vRect.left,
        height: vRect.bottom - vRect.top,
        scrollHeight: entry.r.scrollHeight,
        scrollWidth: entry.r.scrollWidth,
      };

      for (j = 0; j < entry.s.length; j++) {
        section = entry.s[j];
        sRect = section[getBoundingClientRect]();
        // section rectangle relatively to the viewport
        section.rect = {
          left: sRect.left - vRect.left + offset.left,
          top: sRect.top - vRect.top + offset.top,
          right: sRect.right - vRect.left + offset.left,
          bottom: sRect.bottom - vRect.top + offset.top,
          width: sRect.right - sRect.left,
          height: sRect.bottom - sRect.top,
        };
      }
    }
  };


  const reset = function () {
    let i = 0,
      j,
      isBody,
      hasViewportClass,
      classes,
      listener,
      section,
      viewport,
      scroller,
      entry = _null,
      sections;

      // running through existing entries and removing listeners
    for (;i < entries[length];) {
      listener = entries[i].r.vpl;
      entries[i++].r[removeEventListener](scroll, listener, 0);
      _window[removeEventListener](resize, listener, 0);
    }

    // rebuilding entries
    entries = [];
    sections = _document.getElementsByClassName('section');
    for (i = 0; i < sections[length];) {
      // searching for a parent viewport
      viewport = section = sections[i++];
      while (1) {
        hasViewportClass = j = 0;
        isBody = viewport == _document.body;
        if (!isBody) {
          classes = viewport.className.split(' ');
          for (;j < classes[length];) {
            if (classes[j++] == VIEWPORT) {
              hasViewportClass = 1;
              break;
            }
          }
        }

        if (isBody || hasViewportClass) {
          break;
        }

        viewport = viewport.parentNode;
      }

      // searching for exisiting entry for the viewport
      for (j = 0; j < entries[length]; j++) {
        if (entries[j].v == viewport) {
          entry = entries[j];
        }
      }

      // creating a new entry if not found
      if (!entry) {
        scroller = viewport.scroller || viewport;
        entry = {
          v: viewport,
          r: scroller,
          s: [], // list of all sections
        };

        // listener invoked upon the viewport scroll
        scroller.vpl = (function (entry) {
          return function () {
            const scroller = entry.r;
            const vRect = scroller.rect;

            const vTop = vRect[top];
            const vLeft = vRect[left];
            const vBottom = vRect[bottom];
            const vRight = vRect[right];

            const vMiddle = (vBottom + vTop) / 2;
            const vCenter = (vLeft + vRight) / 2;

            // full scorlling amount
            const maxVert = vRect.scrollHeight - vRect.height;
            const maxHoriz = vRect.scrollWidth - vRect.width;

            // viewport scroll ratio, 0..1
            const rateVert = maxVert ? scroller[scroll + Top] / maxVert : 0;
            const rateHoriz = maxHoriz ? scroller[scroll + Left] / maxHoriz : 0;

            // viewport location point moves along with
            // viewport scroll to always meet the borders
            const vMiddlePos = vTop + (vBottom - vTop) * rateVert;
            const vCenterPos = vLeft + (vRight - vLeft) * rateHoriz;

            const offset = {
              top: scroller.scrollTop,
              left: scroller.scrollLeft,
            };

            // updating the data for each section
            // (and searching for the closest section)
            let closest = _null;
            let minDist = _null;

            for (let i = 0; i < entry.s[length];) {
              const section = entry.s[i++];

              const sRect = section.rect;
              const sTop = sRect[top] + vRect[top] - offset.top;
              const sLeft = sRect[left] + vRect[left] - offset.left;
              const sBottom = sRect[bottom] + vRect[top] - offset.top;
              const sRight = sRect[right] + vRect[left] - offset.left;
              const sHeight = sBottom - sTop;
              const sWidth = sRight - sLeft;

              const topOffset = vTop - sTop;
              const leftOffset = vLeft - sLeft;

              // viewport location related to the section
              const vLeftLocation = (vCenterPos - sLeft) / sWidth;
              const vTopLocation = (vMiddlePos - sTop) / sHeight;

              // viewport to section distance, normalized
              const vVertDist =
                          Math_max(0, Math_abs(vTopLocation - 0.5) - 0.5);
              const vHorizDist =
                          Math_max(0, Math_abs(vLeftLocation - 0.5) - 0.5);

              // squared, but we only need to compare
              const dist = vVertDist * vVertDist + vHorizDist * vHorizDist;

              const scrollTopToStart = -topOffset - ctx;
              const scrollTopToMiddle =
                          (sBottom + sTop) / 2 - vMiddle;

              const scrollLeftToStart = -leftOffset - ctx;
              const scrollLeftToCenter =
                          (sLeft + sRight) / 2 - vCenter;

              // updating section data concerning the viewport
              section[VIEWPORT + Top + Start] = topOffset / sHeight;
              section[VIEWPORT + Top + End] = (vBottom - sTop) / sHeight;

              section[VIEWPORT + Left + Start] = leftOffset / sWidth;
              section[VIEWPORT + Left + End] = (vRight - sLeft) / sWidth;

              section[VIEWPORT + Top + Location] = vTopLocation;
              section[VIEWPORT + Left + Location] = vLeftLocation;

              section[VIEWPORT + Scroll + Top + Target] =
                          Math_max(
                            0,
                            Math_min(
                              maxVert,
                              scroller[scroll + Top] +
                                      Math_min(
                                        scrollTopToStart,
                                        scrollTopToMiddle,
                                      ),
                            ),
                          );

              section[VIEWPORT + Scroll + Left + Target] =
                          Math_max(
                            0,
                            Math_min(
                              maxHoriz,
                              scroller[scroll + Left] +
                                      Math_min(
                                        scrollLeftToStart,
                                        scrollLeftToCenter,
                                      ),
                            ),
                          );

              // checking if the section is closer to the viewport
              if (minDist === _null || minDist > dist) {
                minDist = dist;
                closest = section;
              }
            }

            entry.v.currentSection = closest;
          };
        }(entry));

        scroller[addEventListener](scroll, scroller.vpl, 0);
        _window[addEventListener](resize, scroller.vpl, 0);

        entries.push(entry);
      }

      // adding section to the entry of the viewport
      entry.s.push(section);
    }

    updateDimensions();
    _window[addEventListener](resize, updateDimensions, 0);

    // initially setting-up the properties
    for (i = 0; i < entries[length];) {
      entries[i++].r.vpl();
    }
  };


  if (_document.readyState == 'complete') {
    reset();
  } else {
    _window[addEventListener]('load', reset, 0);
  }

  // exports.reset = reset;
  // exports.updateDimensions = updateDimensions;
  return {
    reset,
    updateDimensions,
  };
};
// ));
export default {
  reset: viewport().reset,
  updateDimensions: viewport().updateDimensions,
};

