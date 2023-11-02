import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from './ProfileStatus';


  
describe("ProfileStatus Component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("it-kamasutra.com");
      });

    test("after creation <span> with status should be displayed",async () => {
      const component = create(<ProfileStatus status="it-kamasutra.com" />);
      const root = component.root;
      let span = await root.findByType("span");
      expect(span).not.toBeNull();
      });

    test("after creation <inpit>  shouldn't be displayed",() => {
      const component = create(<ProfileStatus status="it-kamasutra.com" />);
      const root = component.root;
      expect(async() => {
            await root.findByType("input");
      }).toThrow();
      });
  

    test("after creation <span>  should contains correct status", async () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const root = component.root;
        let span = await root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");
        });
    });