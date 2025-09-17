export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label> <br /><br />
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" defaultValue={"The assignment is available online. Submit a link to the landing page of your\n" +
                "                Web application running on Netlify. The landing page should include the following:\n" +
                "                Your full name and section Links to each of the lab assignments, Link to the Kambaz\n" +
                "                application, Links to all relevant source code repositories. The Kambaz application\n" +
                "                should include a link to navigate back to the landing page."}>
      </textarea>
            <br /> <br />
            <table>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points </label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group </label>
                    </td>
                    <td>
                        <select id='wd-group' defaultValue='ASSIGNMENTS'>
                            <option value='ASSIGNMENTS'>ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as </label>
                    </td>
                    <td>
                        <select id='wd-display-grade-as' defaultValue='Percentage'>
                            <option value='Percentage'>Percentage</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type </label>
                    </td>
                    <td>
                        <select id='wd-submission-type' defaultValue='Online'>
                            <option value='Online'>Online</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label> Online Entry Options</label><br/>
                        <input type="checkbox" name="entry-options" id="wd-text-entry"/>
                        <label htmlFor="wd-text-entry">Text Entry</label><br/>
                        <input type="checkbox" name="entry-options" id="wd-website-url"/>
                        <label htmlFor="wd-website-url">Website URL</label><br/>
                        <input type="checkbox" name="entry-options" id="wd-media-recordings"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                        <input type="checkbox" name="entry-options" id="wd-student-annotation"/>
                        <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                        <input type="checkbox" name="entry-options" id="wd-file-upload"/>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>

                </tr>
                </tbody>
                {/* Complete on your own */}
            </table>
        </div>
    );
}
