function framework(init, update) {}

/*




Cody
  2:02 AM
In theory, assuming they provide atleast some of the optional fields, I can detect LTR or STR completely dynamically.
THE ONLY OBSTACLE, is how do I determine LTR or STR for an item that does not provide ANY of the optional fields.
Additionally, what field is it in the database that tells me LTR vs STR for a time entry, I'm not seeing any value that stands out which is what is landing me at the following conclusion.
Is the idea that LTR and STR are somehow different, inhibiting my ability to build this system effectively.
As far as I can tell, STR and LTR only pertains to one thing:
How do I validate my activity/sub activity groups against which data set?
Was the mindset of thinking this way a relic of the old import system?
From the designers perspective he didn't seem to think the difference was significant to warrant total isolation from each other and in retrospect, I'm starting to understand now that I'm thinking about the data differently based on our conversation





2:03
The way I see it, as long as a Sub Activity is provided, its Activity Group must come from the LTR, otherwise, these are the exact same imports with the exact same import flow?
2:05
and some smaller details like Material cant be true if its STR but those are all things that can be caught and corrected at the validation stage.


Austin Lowell
  10:21 AM
Oh yeah 4pm works no problem, thought you meant later in the evening
10:25
The STR system was built on top of the LTR system after it went live. Originally the differences were the category system and the team member field, as well as some minor differences in which fields were required. Later on team member support was added to LTR via spouse support, so the differences are even less. However, they are separated using the "Investor Type" field. An Investor type of STR denotes an STR entry, while an investor type of LTR or empty denotes an LTR entry.
I would not spend time auto-detecting, as you will run into situations where it will be too difficult. It is much better to either ask the user or have a column designate


Cody
  10:25 AM
ahh Investor Type is the field
10:26
gotcha that makes sense, I made sure to wait on that idea in case I was wrong


Austin Lowell
  10:29 AM
And to be clear, LTR uses the following for categorization:
-Time Entry Category (os) (Material/General)
-Activity Group
-Activity Subcategory
While STR uses a different field:
-Activity Group STR
Some other differences:
-STR entries can have any team member, while LTR entries can only have the primary user or the spouse. If the spouse is selected, Time Entry Category (os) must be material
-A property is required for STR entries, but not for LTR entries
10:30
And the following fields are required for LTR:
-Date
-Time
-Time Entry Category (os)
The following fields are required for STR:
-Date
-Time
-Properties


Cody
  10:46 AM
So theres a few scenarios where its completely obvious if ifs STR or LTR, but for the scenarios where its not, do we need to require an isLTR field in teh import?


Austin Lowell
  10:47 AM
Either ask the user or require the field in the file


Cody
  10:47 AM
So Pre Import, during validation, we were unable to decide, LTR or STR, just a pop up?
Is this a Long Term Rental or Short Term Rental import file?


Austin Lowell
  10:48 AM
I would say avoid popups if you can, but some sort of small UI element


Cody
  10:49 AM
Okay, so above the Confirm Import button.
A radiobox?
10:49
ConfirmImport cant be click if RadioBox is unchecked


Austin Lowell
  10:50 AM
Sounds good
10:50
Only if it doesn't detect the column, obviously


Cody
  10:50 AM
yeah we want to reduce user actions as much as possible

*/
