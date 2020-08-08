// React
import React, { Component } from "react";
import PropTypes from "prop-types";
// Material-UI
import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  ...theme.spread,
});

class disclaimer extends Component {
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography variant="h4" color="primary">
          Disclaimer
        </Typography>
        <hr className={classes.hr} />
        <Typography variant="body2" color="textPrimary">
          <small>Last updated: 2020-08-04</small>
          <p>
            <b>WEBSITE DISCLAIMER</b>
          </p>
          <p>
            The information provided by <b>Cedar Mingle</b> (“Company”, “we”,
            “our”, “us”) on <b>cedarmingle.com</b> (the “Site”) is for general
            informational purposes only. All information on the Site is provided
            in good faith, however we make no representation or warranty of any
            kind, express or implied, regarding the accuracy, adequacy,
            validity, reliability, availability, or completeness of any
            information on the Site.
          </p>
          <p>
            UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY
            LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE
            SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE
            OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS
            SOLELY AT YOUR OWN RISK.
          </p>
          <p>
            <b>EXTERNAL LINKS DISCLAIMER</b>
          </p>
          <p>
            The Site may contain (or you may be sent through the Site) links to
            other websites or content belonging to or originating from third
            parties or links to websites and features. Such external links are
            not investigated, monitored, or checked for accuracy, adequacy,
            validity, reliability, availability or completeness by us.
          </p>
          <p>
            WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR
            THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY
            THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR
            FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A
            PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION
            BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
          </p>
          <p>
            <b>TESTIMONIALS DISCLAIMER</b>
          </p>
          <p>
            The Site may contain testimonials by users of our products and/or
            services. These testimonials reflect the real-life experiences and
            opinions of such users. However, the experiences are personal to
            those particular users, and may not necessarily be representative of
            all users of our products and/or services. We do not claim, and you
            should not assume that all users will have the same experiences.
          </p>{" "}
          <p>YOUR INDIVIDUAL RESULTS MAY VARY.</p>{" "}
          <p>
            The testimonials on the Site are submitted in various forms such as
            text, audio and/or video, and are reviewed by us before being
            posted. They appear on the Site verbatim as given by the users,
            except for the correction of grammar or typing errors. Some
            testimonials may have been shortened for the sake of brevity, where
            the full testimonial contained extraneous information not relevant
            to the general public.
          </p>{" "}
          <p>
            The views and opinions contained in the testimonials belong solely
            to the individual user and do not reflect our views and opinions.
          </p>
          <p>
            <b>ERRORS AND OMISSIONS DISCLAIMER</b>
          </p>
          <p>
            While we have made every attempt to ensure that the information
            contained in this site has been obtained from reliable sources,
            Cedar Mingle is not responsible for any errors or omissions or for
            the results obtained from the use of this information. All
            information in this site is provided “as is”, with no guarantee of
            completeness, accuracy, timeliness or of the results obtained from
            the use of this information, and without warranty of any kind,
            express or implied, including, but not limited to warranties of
            performance, merchantability, and fitness for a particular purpose.
          </p>{" "}
          <p>
            In no event will Cedar Mingle, its related partnerships or
            corporations, or the partners, agents or employees thereof be liable
            to you or anyone else for any decision made or action taken in
            reliance on the information in this Site or for any consequential,
            special or similar damages, even if advised of the possibility of
            such damages.
          </p>
          <p>
            <b>GUEST CONTRIBUTORS DISCLAIMER</b>
          </p>
          <p>
            This Site may include content from guest contributors and any views
            or opinions expressed in such posts are personal and do not
            represent those of Cedar Mingle or any of its staff or affiliates
            unless explicitly stated.
          </p>
          <p>
            <b>LOGOS AND TRADEMARKS DISCLAIMER</b>
          </p>
          <p>
            All logos and trademarks of third parties referenced on
            cedarmingle.com are the trademarks and logos of their respective
            owners. Any inclusion of such trademarks or logos does not imply or
            constitute any approval, endorsement or sponsorship of Cedar Mingle
            by such owners.
          </p>
          <p>
            <b>CONTACT US</b>
          </p>
          <p>
            Should you have any feedback, comments, requests for technical
            support or other inquiries, please contact us by email:{" "}
            <b>support@cedarmingle.com</b>.
          </p>
        </Typography>
      </>
    );
  }
}

disclaimer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(disclaimer);
