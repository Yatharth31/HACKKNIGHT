import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from 'flowbite-react';
import { useState } from 'react';

export function MatchesProfile() {
  const [showChatBox, setShowChatBox] = useState(false);

  function newChat() {
    setShowChatBox(true);
  }

  return (
    <div className="flex justify-center ">
      <div className="ml-1 w-4/12">
        <Card className="mt-8 mb-16">
          <img
            className="object-fill"
            src="https://previews.123rf.com/images/olezzo/olezzo1902/olezzo190200131/117351268-handsome-happy-man-wearing-white-t-shirt-at-the-sea-or-the-ocean-background-travel-vacation-holiday.jpg"
          />
          <CardHeader>
            <CardTitle>John Doe</CardTitle>

            <CardDescription>
              Hi, I'm John, and I'm willing to help those in need. I'm currently
              working at Melbourne, and....
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p></p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={newChat}>Start Chat</Button>
          </CardFooter>
        </Card>

        <Card className="mt-8 mb-16">
          <img
            className="object-fill"
            src="https://images.pexels.com/photos/2285991/pexels-photo-2285991.jpeg?cs=srgb&dl=pexels-nguyen-gia-huy-tran-2285991.jpg&fm=jpg"
          />
          <CardHeader>
            <CardTitle>Bobby</CardTitle>

            <CardDescription>
              Hi, I'm Bobby, and I'm willing to help those in need. I'm
              currently working at Melbourne, and....
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p></p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={newChat}>Start Chat</Button>
          </CardFooter>
        </Card>

        <Card className="mt-8 mb-16">
          <img
            className="object-fill"
            src="https://img.freepik.com/premium-photo/happy-asian-male-student-eyeglasses-making-selfie-showing-thumb-up-while-looking-camera-outdoors_171337-47737.jpg"
          />
          <CardHeader>
            <CardTitle>Bob</CardTitle>

            <CardDescription>
              Hi, I'm Eve, and I'm willing to help those in need. I'm currently
              working at Melbourne, and....
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={newChat}>Start Chat</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="ml-4">{showChatBox && <ChatBox />}</div>
    </div>
  );
}

export function ChatBox() {
  const textBoxStyles = {
    width: '600px', // Adjust the width
    height: '100px', // Adjust the height
  };

  return (
    <div>
      <Card className="mt-8 mb-16" style={{ width: '650px' }}>
        <CardHeader>
          <CardTitle>Chat Room</CardTitle>
          <CardDescription>Send a message to start chatting!</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea style={textBoxStyles} placeholder="Enter text here..." />
        </CardContent>
      </Card>
    </div>
  );
}
