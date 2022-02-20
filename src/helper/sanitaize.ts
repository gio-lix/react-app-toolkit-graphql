// @ts-ignore
import DOMPurify from 'dompurify';
/**
 * Sanitize markup or text when used inside dangerouslysetInnerHTML
 *
 * @param {string} content Plain or html string.
 *
 * @return {string} Sanitized string
 */
export const sanitize = ( content : any) => {
    // @ts-ignore
    return process.browser ? DOMPurify.sanitize( content ) : content;
};
