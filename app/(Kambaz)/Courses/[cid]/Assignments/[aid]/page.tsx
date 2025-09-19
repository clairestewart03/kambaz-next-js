export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label> <br /><br />
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" defaultValue={"The assignment is available online. Submit a link to the landing page of your" +
                " Web application running on Netlify. The landing page should include the following:" +
                " Your full name and section Links to each of the lab assignments, Link to the Kambaz" +
                " application, Links to all relevant source code repositories. The Kambaz application" +
                " should include a link to navigate back to the landing page."}>
      </textarea>
            <br /> <br />
            <table>
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points </label>
                    </td>
                    <td>
                        <input id="wd-points" type="number" defaultValue={100}/>
                    </td>
                </tr>
                <tr>
                    <td><br/></td>
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
                    <td><br/></td>
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
                    <td><br/></td>
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
                    <td><br/></td>
                </tr>
                <tr>
                    <td>

                    </td>
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
                <tr>
                    <td><br/></td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label>Assign </label>
                    </td>
                    <td align="left" valign="top">
                        <label htmlFor="wd-assign-to">Assign to </label>
                    </td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <input id="wd-assign-to" defaultValue={"Everyone"}/>
                    </td>
                </tr>
                <tr>
                    <td><br/></td>
                </tr>
                <tr>
                    <td></td>
                    <td align="left" valign="top">
                        <label htmlFor="wd-due-date">Due </label>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="date" defaultValue="2024-05-13" id="wd-due-date"></input>
                    </td>
                </tr>
                <tr>
                    <td><br/></td>
                </tr>
                <tr>
                    <td>
                    </td>
                    <td align={"left"} valign="top">
                        <label htmlFor={"wd-available-from"}>Available from </label>
                    </td>
                    <td align={"left"} valign="top">
                        <label htmlFor={"wd-available-until"}>Until </label>
                    </td>
                </tr>
                <tr>
                    <td><br/></td>
                    <td>
                        <input type="date" defaultValue="2024-05-06" id="wd-available-from"></input>

                    </td>
                    <td>
                        <input type="date" defaultValue="2024-05-20"
                               id="wd-available-until"></input>
                    </td>
                </tr>
                <tr>
                    <td><br/></td>
                </tr>
                </tbody>
            </table>
            <hr/>
            <table width="100%">
                <tr>
                    <td align="right">
                        <button>Cancel</button>
                        <button>Save</button>
                    </td>
                </tr>
            </table>

        </div>
    );
}
